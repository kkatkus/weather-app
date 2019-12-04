const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  const routes = ['/weather/1.0/report.json', 'weather/1.0/report.json'];

  const options = {
    target: 'https://weather.api.here.com',
    changeOrigin: true,
    logLevel: 'debug',
    secure: false,
    onError: (err, req, res) => {
      console.log('err', err, req.url);
    },
  };
  app.use(proxy(routes, options));

  //weather.api.here.com/weather/1.0/report.json

  return app;
};
