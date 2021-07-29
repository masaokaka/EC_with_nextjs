import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../helpers/db_utils"; //mongoDBにconnectする設定を読み込む
import { generateUploadUrl } from "../../../config/aws_s3"; //s3.jsファイルの読み込み

async function handler(req: NextApiRequest, res: NextApiResponse) {
//   let client;
//   try {
//     client = await connectDB();
//   } catch (error) {
//     res.status(500).send({ message: "connecting to DB failed" });
//     return;
//   }
//   if (client) {
//     console.log("disconnected");
//     client.disconnect();
//   }
}

export default handler;
