
const fs = require('fs');
const fastify = require('fastify')({ logger: { level: 'error' } });
const moment = require('moment');
const Next = require('next');
const Telegraf = require('telegraf')
const _ = require('lodash');
const pump = require('pump');
const uuid = require('uuid/v1');

const SocksAgent = require('socks5-https-client/lib/Agent');
const socksAgent = new SocksAgent({
    socksHost: '51.79.54.137',
    socksPort: '6900',
    socksUsername: 'proxyuser',
    socksPassword: 'proxy!pass'
});

fastify.register(require('fastify-multipart'));

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

fastify.register(require('fastify-cors'), {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
});

const botTokenDev = '659727031:AAFZ_8AXLTu2bBSej7_2UN5ujjlVQPsLggk';
const botToken = '556896286:AAH791dcePJHlImFEs3HYryHa8HDRljMyW4';

let bot = new Telegraf(botTokenDev, { telegram: { agent: socksAgent } });

fastify.register((fastify, opts, next) => {
  const app = Next({ dev });
  app
    .prepare()
    .then(() => {
      if (dev) {
        fastify.get('/_next/*', (req, reply) => {
          return app.handleRequest(req.req, reply.res).then(() => {
            reply.sent = true
          })
        })
      }

        fastify.post('/api/uploadUserImage', async(req, reply) => {
            let fields = {files: []};

            let tempDir = uuid();
            fs.mkdirSync(`./static/uploadImg/${tempDir}`);
            const mp = req.multipart((field, file, filename) => {
                fields.files.push(filename);
                pump(file, fs.createWriteStream(`./static/uploadImg/${tempDir}/${filename}`));
            }, async function (err) {
                if (err) {
                    reply.send(err);
                    return
                }

                fields.phone = fields.phone.replace(/\s+|\+|\(|\)/g, '');
                //try {
                bot.telegram.sendMessage(-1001204370141, `Зарегистрировался новый водитель!\n${fields.name}\n${fields.phone}\nОжидаемый гонорар: ${fields.price} руб.`, { parse_mode: 'HTML' });
                let mediaGroup = [];
                _.forEach(fields.files, file=>{
                    mediaGroup.push({
                        'media': `https://dev.lux-motor.ru/static/uploadImg/${tempDir}/${file}`,
                        'type': 'photo'
                    });
                });
                bot.telegram.sendMediaGroup(-1001204370141, mediaGroup);
                bot.launch();
                //-- Закончили получать форму
                /*} catch(err) {
                    console.log(err);
                }*/
                reply.code(200).send();
            });

            mp.on('field', (field, value)=>{
                fields[field] = value;
            });
        });

      fastify.post('/api/sendRequest',  async(req, reply) => {
        let data = req.body;
        try {
          let dt = moment().utc().utcOffset(5).format('DD.MM.YYYY HH:mm');
          bot.telegram.sendMessage(-1001397757254, `${dt}\n${data.fio}\n<a href="tel:${data.phone}">${data.phone}</a>`, { parse_mode: 'HTML' });
          bot.launch();
        } catch(err) {
          console.log(err.code);
        }

        reply.header('Content-Type', 'application/json').code(200);
        reply.send({ result: true });
      });

      fastify.get('/service/*', (req, reply) => {
      return app.render(req.req, reply.res, '/service', req.query).then(() => {
        reply.sent = true;
      })
      });

      fastify.get('/cars/*', (req, reply) => {
      return app.render(req.req, reply.res, '/cars', req.query).then(() => {
        reply.sent = true;
      })
      });

      fastify.get('/*', (req, reply) => {
      return app.handleRequest(req.req, reply.res).then(() => {
        reply.sent = true;
      })
      });

      fastify.setNotFoundHandler((request, reply) => {
      return app.render404(request.req, reply.res).then(() => {
        reply.sent = true;
      })
      });

      next()
    })
    .catch(err => next(err))
})

fastify.listen(port, err => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
