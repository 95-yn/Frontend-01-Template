const http  = require('http')
const querystring = require('querystring')
const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process');
const packageName = './package';
child_process.exec('open https://github.com/login/oauth/authorize?client_id=Iv1.3703954276de6dfe&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fauth&state=abc123&login=yyyyn');

const server = http.createServer((request, response) => {
  console.log(request.url);
  if(request.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }
  const token = request.url.match(/token=([^&]+)/)[1];
  console.log(token);
  const options = {
    // hostname: '120.79.181.194',
    hostname: 'localhost',
    port: 8081,
    path: '/upload/?filename=' + packageName + '.zip',
    method: 'POST',
    headers: {
      token: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };

  const archive = archiver('zip', {
    zlib: {
      level: 9
    }
  });

  archive.directory(packageName,false);

  archive.finalize();

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });

  archive.pipe(req);

  archive.on('end', () => {
    req.end();
    console.log('publish success!!!');
    req.end('publish success!!!');
    server.close();
  });

  req.on('error', e => {
    console.error(e.message);
  });


})


server.listen(8080);
// fs.stat(packageName, (err,stat) => {
//     console.log(stat.size);
//     const options = {
//         hostname: '120.79.181.194',
//         port: 80,
//         path: '/upload/?filename=' + packageName + '.zip',
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         }
//       };

//     const req = http.request(options, (res) => {
//     console.log(`STATUS: ${res.statusCode}`);
//     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//   });
  
//   var archive = archiver('zip', {
//     zlib: {
//       level: 9
//     }
//   });
//   archive.directory(packageName,false);

//   archive.finalize();
//   archive.pipe(req);

//   archive.on('end', () => {
//     req.end();
//   });
// });