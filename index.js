(async function moon() {
  const mockttp = require('mockttp');
  const fs = require('fs');
  const config = require('./config.js');
  // Create a proxy server with a self-signed HTTPS CA certificate:

  // const https = await mockttp.generateCACertificate();
  // const { key, cert } = await mockttp.generateCACertificate();
  //   fs.writeFileSync('key.pem', key);
  //   fs.writeFileSync('cert.pem', cert);

  const server = mockttp.getLocal({
    port: config.proxyPort,
    https: {
      keyPath: './key.pem',
      certPath: './cert.pem',
    },
  });

  // DONT USE PROXY FOR THESE HOSTS
  let passhosts = config.passForHosts;

  // uncomment to test with already existing server .. or put your own
  let proxies = config.proxyServer;

  let randomfromArr = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  server.forAnyRequest().thenPassThrough({
    beforeRequest: (request, re) => {
      let pass = false;
      let Oghost = request.headers['host'];
      passhosts.forEach((he) => {
        let reg = new RegExp(he);
        let test = reg.test(Oghost);
        if (test) {
          console.log('PASS THROUGH > ', test, Oghost);
          pass = true;
        }
      });
      if (pass) return request;

      let proxy = randomfromArr(proxies).replace('https://', '').split('/')[0];
      let protocol = request['protocol'];

      console.log(
        'req',
        request.protocol + '://' + request.headers['host'],
        '> ' + proxy
      );
      request.headers['host'] = proxy;
      request['url'] = request['url'].replace(Oghost, proxy);

      request.headers = {
        ...request.headers,
        'hash-me': Oghost,
        'protocol-me': protocol,
      };
      return request;
    },
  });

  setInterval(() => {
    // console.clear();
  }, 5000);

  await server.start(config.proxyPort);

  console.log(`Server running on port ${server.port}`);
  console.log(
    '\x1b[33m%s\x1b[0m',
    'IF THIS IS FIRST TIME LAUNCING .. \n install MOCKHTTP.crt file in your system"'
  );

  console.log(
    '\x1b[33m%s\x1b[0m',
    '\nTry this out\n https://www.google.com/search?q=what%27s+my+ip'
  );
})(); // (Run in an async wrapper so we can use top-level await everywhere)
