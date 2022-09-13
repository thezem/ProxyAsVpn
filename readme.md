# ProxyAsVpn

ProxyAsVpn redirects all requests to your middleware server to make the requests for you , therefore you're using the ip of the server, instead of making the requests directly from your device

## Quickstart

- install `MOCKHTTP.crt` certifcate in your device
- for middleware server , run `npm run server`
- for local system proxy , run `npm run sysproxy`

## Server `npm run server`

```node server.js

[HPM] Proxy created: / -> localhost
[HPM] Proxy rewrite rule created: "^/" ~> ""
Example app listening on port 3000!

#####

put below url in "proxyServer" in config.js
or use your server url provided by your hosting service


localtunnel server > YourTunnel.loca.lt
```

### Client config.js

```
config = {
  proxyServer: ["YourTunnel.loca.lt"],
  passForHosts: [
    'instagram',
    'facebook',
    'telegram',
    'whatsapp',
  ],
  proxyPort: 8081, // run local proxy to port
};
```

- Now add 127.0.0.1:8081 to your system as proxy

### `npm run sysproxy`

```
> npm run sysproxy


Server running on port 8081
IF THIS IS FIRST TIME LAUNCING ..
 install MOCKHTTP.crt file in your system"


Try this out
 https://www.google.com/search?q=what%27s+my+ip

```

## HOW ?

### look..

- you run the local proxy in your system and install its certicate
- your system passes everything to this local proxy
- now this proxy changes the domain of the requests for example from `example.github` to `YourTunnel.loca.lt`
- now middleware running on `YourTunnel.loca.lt` makes the request for you and calls `example.github` and returns the response

#### Did you make a request to example.github ?

- NO

#### Does example.github have your ip?

- NO

#### What ip do they have?

- the ip that made the request... which is not you

#### Is this a good idea?

- NO
