config = {
  proxyServer: [
    // 'repapi2.robintv.co'
  ], // a list of all middleware running , if more than one . , requests are gonna be spread across them; don't put more than one if you think you gonna get blocked
  passForHosts: [
    'instagram',
    'facebook',
    'telegram',
    'replit',
    'repl.co',
    'whatsapp',
  ], // don't proxy for urls including these hosts..
  proxyPort: 8081, // local port
};

module.exports = config;
