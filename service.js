var express = require('express');
var app = express();
var request = require('request');
//透传
app.all('*', function (req, res) {
  var method = req.method.toUpperCase();
  var proxy_url = 'http://172.18.17.90:3105' + req.params[0];
console.log('测试',req);
  var options = {
        headers: {"Connection": "close"},
          url: proxy_url,
          method: method,
          json: true,
          body: req.body
  };

  function callback(error, response, data) {
      if (!error && response.statusCode == 200) {
          console.log('------接口数据------',data);

          res.json(data)
      }
  }

  request(options, callback);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});