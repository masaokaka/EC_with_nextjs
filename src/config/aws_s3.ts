import AWS from "aws-sdk";
//ランダム変数を生成するためのメソッド
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);

const region = "ap-northeast-1";
const bucketName = process.env.AWS_S3_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESSKEY_ID;
const secretAccessKey = process.env.AWS_SECRETACCESS_KEY;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export async function generateUploadUrl() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");
  const params = {
    Bucket: bucketName,
    Key: `img/${imageName}`, // path for the image in the bucket
    Expires: 60, //to allow temporary url access for 60seconds
  };
  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
