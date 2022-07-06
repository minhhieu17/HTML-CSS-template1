const fs = require('fs')
function writeDataToFile(filename,Content) {
    fs.writeFileSync(filename, JSON.stringify(Content), 'utf8', (err)=> {
        if(err) {
            console.log(err)
        }
    })
};

function getPostData(req) {
    return new Promise((resolve, reject) => {
      try {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          resolve(body);
        });
      } catch(error) {
        reject(error);
      }
    });
  }
module.exports = {
     writeDataToFile,
     getPostData
}