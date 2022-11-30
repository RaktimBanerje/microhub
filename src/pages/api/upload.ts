import AWS from "aws-sdk";
import formidable from "formidable-serverless";
import fs from "fs";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async (req, res) => {
  // create S3 instance with credentials
  const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint("sgp1.digitaloceanspaces.com"),
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
    region: "sgp1",
  });
  // parse request to readable form
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    // Account for parsing errors
    if (err) return res.status(500);
    // Read file
    const file = fs.createReadStream(files.uploader.path);
    // Upload the file
    s3.upload({
      // params
      Bucket: process.env.SPACES_BUCKET, // Add bucket name here
      ACL: "public-read", // Specify whether anyone with link can access the file
      Key: "something", // Specify folder and file name
      Body: file,
      ContentType: "image/jpeg",
    }).send((err, data) => {
      if (err) {
        console.log("err", err);
        return res.status(500);
      }
      if (data) {
        console.log("data", data);
        return res.json({
          url: data.Location,
        });
      }
    });
  });
};
