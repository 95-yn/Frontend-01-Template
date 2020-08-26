const http = require('http');
const https = require('https');
const fs = require('fs')

const unzip = require('unzipper');
// Create an HTTP server
const server = http.createServer((req, res) => {
    // console.log(req)

    if(req.url.match(/^\/auth/)) {
      return auth(req,res)
    }if (req.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }
  if (req.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }
  // const fileSys = (req,res) => {
  //   let matched = req.url.match(/filename=([^&]+)/);
  //   let filename = (matched && matched[1]);
  //   // console.log(filename);
  //   if (!filename) {
  //     return;
  //   }


  //   let writeStream = unzip.Extract({ path: '../server/public' });
  //   req.pipe(writeStream);


  //   req.on('end', () => {
  //     res.writeHead(200, { 'Content-Type': 'text/plain' });
  //     res.end('okay');
  //   })
  // }
  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/user',
    method: 'GET',
    headers: {
      Authorization: `token ${req.headers.token}`,
      'User-Agent': 'toy-publish',
    },
  };
  console.log('options ' + options);

  const request = https.request(options, (response) => {
    let body = '';
    response.on('data', (d) => {
      if (d) {
        body += d.toString();
      }
    });

    response.on('end', () => {
      console.log(body);
      let user = JSON.parse(body);
      // fileSys(user);
      let writeStream = unzip.Extract({
        path: '../server/public/package'
      });
      req.pipe(writeStream);
      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('okay');
      })
    });
  });
  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
  
});
server.listen('8081')

function auth(req,res) {
  const code = req.url.match(/code=([^&]+)/)[1];
  const state = 'abc123';
  const client_secret = '20a18df87c1e2799ee8a233b213f4a62796e59b6';
  const client_id = 'Iv1.3703954276de6dfe';
  const redirect_uri = encodeURIComponent('http://localhost:8081/auth');

  const params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`
  const url = `/login/oauth/access_token?${params}`;

  const options = {
    hostname: 'github.com',
    port: 443,
    path: url,
    methods: 'POST'

  }
  const request = https.request(options, response => {
    response.on('data', (d) => {
      console.log(d.toString());
      let result = d.toString().match(/access_token=([^&]+)/);
      if(result) {
        let token = result[1];
        res.writeHead(200, {
          'access_token': token,
          'Content-Type': 'text/html'
        });
        res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`);
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.end('error');
      }
    })
    
  });
  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
}