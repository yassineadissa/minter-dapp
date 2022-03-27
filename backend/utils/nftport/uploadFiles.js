const FormData = require("form-data");
const path = require("path");
const basePath = process.cwd();
const fs = require("fs");

const { RateLimit } = require('async-sema');
const { fetchWithRetry } = require(`${basePath}/utils/functions/fetchWithRetry.js`);

const { LIMIT } = require(`${basePath}/src/config.js`);
const _limit = RateLimit(LIMIT);

const allMetadata = [];
const regex = new RegExp("^([0-9]+).png");

async function main() {
  console.log("Starting upload of images...");
  const files = fs.readdirSync(`${basePath}/build/images`);
  console.log("1");
  files.sort(function(a, b){
    return a.split(".")[0] - b.split(".")[0];
  });
  console.log("2");
  for (const file of files) {
    try {
      console.log("2.1");
      if (regex.test(file)) {
        const fileName = path.parse(file).name;
        let jsonFile = fs.readFileSync(`${basePath}/build/json/${fileName}.json`);
        let metaData = JSON.parse(jsonFile);
        console.log("2.2");
        if(!metaData.image.includes('https://')) {
          await _limit()
          const url = "https://api.nftport.xyz/v0/files";
          
          const formData = new FormData();
          const fileStream = fs.createReadStream(`${basePath}/build/images/${file}`);
          console.log("2.2.1");
          formData.append("file", fileStream);
          const options = {
            method: "POST",
            headers: {},
            body: formData,
          };
          console.log("2.2.2");
          console.log(url);
          console.log(options);
          const response = await fetchWithRetry(url, options);
          console.log("2.2.3");
          metaData.image = response.ipfs_url;
          console.log("2.3");
          fs.writeFileSync(
            `${basePath}/build/json/${fileName}.json`,
            JSON.stringify(metaData, null, 2)
          );
          console.log(`${response.file_name} uploaded & ${fileName}.json updated!`);
        } else {
          console.log(`${fileName} already uploaded.`);
        }
        console.log("2.4");
        allMetadata.push(metaData);
      }
    } catch (error) {
      console.log(`Catch: ${error}`);
    }
  }
  console.log("3");
  fs.writeFileSync(
    `${basePath}/build/json/_metadata.json`,
    JSON.stringify(allMetadata, null, 2)
  );
}

main();
