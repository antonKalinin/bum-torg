var express = require('express'),
    multer = require('multer'),
    nodemailer = require('nodemailer'),
    config = require('./config.js'),
    app = express(),
    formParser = multer();

app.use(express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/order', formParser.array(), function (req, res) {
    if (!req || !req.body || !req.body.phone) {
        return;
    }

    var order = req.body,
        transporter = nodemailer.createTransport({
            service: 'yandex',
            auth: {
                user: config.mail.login,
                pass: config.mail.pass
            }
        }, {
            // default values for sendMail method
            from: 'bum-torg.ru@yandex.com'
        });

    try {
        transporter.sendMail({
            to: 'sashasasev@gmail.com',
            subject: 'Заказ на сбор мукулатуры от ' + order.phone,
            text: 
                'Имя: ' + order.name + '\n' +
                'Телефон: ' + order.phone + '\n' +
                'Почта: ' + order.email + '\n\n' +
                'Комментарий: ' + order.comment + '\n'
        });
    } catch (error) {
        res.status(500).end();
    }

    res.status(200).end();
});

var server = app.listen(8010, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});