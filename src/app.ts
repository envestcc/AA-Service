import express, { Request, Response } from "express";
import morgan from "morgan";
import { ethers } from "ethers";
import { Client, Presets } from "userop";

interface SendUserOpReq {
  privateKey: string;
  to: string;
  value: string;
  data: string;
  chainRPC: string;
  bundlerRPC: string;
  paymasterRPC: string;
  entryPointAddress: string;
  accountFactoryAddress: string;
}

interface SendUserOpResp {
  txHash: string;
  userOpHash: string;
}

const app = express();
// app.use(morgan("dev"));
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"), "-",
    tokens["response-time"](req, res), "ms",
    JSON.stringify(req.body)
  ].join(" ");
}));

app.get("/", (req, res) => {
  // res.send("Hello, world!");
  res.status(500).json({ error: "hello" });
});

async function sendUserOp(req: Request<{}, {}, SendUserOpReq>, resp: Response<SendUserOpResp>) {
  const { privateKey, to, value, data, chainRPC, bundlerRPC, paymasterRPC, entryPointAddress, accountFactoryAddress } = req.body;
  const paymasterMiddleware = paymasterRPC
    ? Presets.Middleware.verifyingPaymaster(
      paymasterRPC,
        ""
      )
    : undefined;
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    new ethers.Wallet(privateKey),
    chainRPC,
    { 
      overrideBundlerRpc: bundlerRPC,
      factory: accountFactoryAddress,
      entryPoint: entryPointAddress,
      salt: 1,
      paymasterMiddleware: paymasterMiddleware
    }
  );
  const client = await Client.init(chainRPC, {
    entryPoint: entryPointAddress,
    overrideBundlerRpc: bundlerRPC,
  });

  const target = ethers.utils.getAddress(to);
  const valueEth = ethers.utils.parseEther(value);
  const res = await client.sendUserOperation(
    simpleAccount.execute(target, valueEth, data),
    {
      dryRun: false,
      onBuild: (op) => console.log("Signed UserOperation:", op),
    }
  );
  console.log(`UserOpHash: ${res.userOpHash}`);

  console.log("Waiting for transaction...");
  const ev = await res.wait();
  console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);

  const txHash = ev?.transactionHash ?? "";
  const userOpHash = res.userOpHash;

  resp.json({ txHash, userOpHash });
}

app.use(express.json()).post("/userop/tx", async (req: Request<{}, {}, SendUserOpReq>, resp: Response) => {
  try {
    await sendUserOp(req, resp);
  } catch (err) {
    console.error(err);
    resp.status(500).json({ error: err });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err);
  res.status(500).json({ error: err });
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
