const express = require('express');
const cors = require('cors');
const localtunnel = require('localtunnel');

const {
  createProxyMiddleware,
  responseInterceptor,
} = require('http-proxy-middleware');

const app = express();
app.use(cors());

const Proxy = createProxyMiddleware({
  target: 'localhost',
  changeOrigin: true,
  pathRewrite: {
    [`^/`]: '',
  },
  ws: true,
  followRedirects: true,
  secure: true,
  router: function (req) {
    return req.headers['protocol-me'] + '://' + req.headers['hash-me'];
  },
});

app.use((req, res, next) => {
  if (req.headers['hash-me']) {
    console.log(req.headers['hash-me']);
    res.set('cache-control', 'public, s-max-age=96600');
    return Proxy(req, res, next);
  } else {
    res.send('HEEY THERE');
  }
});

setInterval(() => {
  // console.clear();
}, 5000);

app.listen(3000, (err) => {
  if (err) console.log('Error in server setup');
  console.log(`Example app listening on port ${3000}!`);
});

process
  .on('unhandledRejection', (reason, p) => {
    console.log(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', (err) => {
    console.log(err, 'Uncaught Exception thrown');
  });

(async function makeMeTunnel() {
  const tunnel = await localtunnel({ port: 3000 });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me

  console.log(
    '\n#####\n\nPut below url in  "proxies" array\nor use your server url provided by your hosting service\n'
  );

  console.log('localtunnel server > ', tunnel.url.replace('https://', ''));

  tunnel.on('close', () => {
    console.log('TUNNEL CLOSED ,.. NEW ONE COMING RIGHT UP !');
    return makeMeTunnel();
  });
})();
