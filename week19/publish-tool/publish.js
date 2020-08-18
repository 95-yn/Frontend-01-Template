const http  = require('http')
const querystring = require('querystring')
const fs = require('fs');
const archiver = require('archiver');
const packageName = './package';
fs.stat(packageName, (err,stat) => {
    console.log(stat.size);
    const options = {
        hostname: 'localhost',
        port: 8081,
        path: '/?filename=' + packageName + '.zip',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };

    const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });
  
  var archive = archiver('zip', {
    zlib: {
      level: 9
    }
  });
  archive.directory(packageName,false);

  archive.finalize();
  archive.pipe(req);

  archive.on('end', () => {
    req.end()
  });

  
  // req.on('error', (e) => {
  //   console.error(`problem with request: ${e.message}`);
  // });
  
//   let readStream = fs.createReadStream(packageName);
//   // Write data to request body
//   readStream.pipe(req);
// //   req.write(postData);
// readStream.on('end', () => {
//     req.end();
// })
//   
});