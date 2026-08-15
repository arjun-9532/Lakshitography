#!/usr/bin/env node

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dqfnortzu",
  api_key: "174448278422654",
  api_secret: "XH9zY_XWwxKLki1wwGTSEl-g2Gw",
  secure: true,
});

const sampleImageUrl =
  "https://res.cloudinary.com/dqfnortzu/image/upload/v1782744532/sakshi_wedding_1_o18hfv.jpg";

async function main() {
  const uploaded = await cloudinary.uploader.upload(sampleImageUrl, {
    resource_type: "image",
  });

  console.log(`Uploaded secure URL: ${uploaded.secure_url}`);
  console.log(`Public ID: ${uploaded.public_id}`);

  const details = await cloudinary.api.resource(uploaded.public_id, {
    resource_type: "image",
  });

  const transformedUrl = cloudinary.url(uploaded.public_id, {
    secure: true,
    fetch_format: "auto", // f_auto selects the best image format for the browser.
    quality: "auto", // q_auto balances visual quality with a smaller file size.
  });

  console.log(
    "Done! Click link below to see optimized version of the image. Check the size and the format.",
  );
  console.log(`Transformed URL: ${transformedUrl}`);
}

main().catch((error) => {
  console.error("Cloudinary onboarding failed:", error.message);
  process.exitCode = 1;
});
