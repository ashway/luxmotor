
const fs = require('fs');
const fastify = require('fastify')({ logger: { level: 'error' } });
const moment = require('moment');
const Next = require('next');
const TelegramBot = require('node-telegram-bot-api');
const _ = require('lodash');
const concat = require('concat-stream');
const pump = require('pump');
const uuid = require('uuid/v1');

fastify.register(require('fastify-multipart'));

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

fastify.register(require('fastify-cors'), {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
});

const botTokenDev = '659727031:AAFZ_8AXLTu2bBSej7_2UN5ujjlVQPsLggk';
const botToken = '556896286:AAH791dcePJHlImFEs3HYryHa8HDRljMyW4';

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

        fastify.post('/uploadUserImage', async(req, reply) => {
            let fields = {files: []};

            let tempDir = uuid();
            fs.mkdirSync(`./uploadedCars/${tempDir}`);
            const mp = req.multipart((field, file, filename) => {
                fields.files.push(filename);
                pump(file, fs.createWriteStream(`./uploadedCars/${tempDir}/${filename}`));
            }, async function (err) {
                if (err) {
                    reply.send(err);
                    return
                }

                fields.phone = fields.phone.replace(/\s+|\+|\(|\)/g, '');
                let bot = new TelegramBot(botTokenDev, {
                    polling: true
                });

                try {
                    let mediaGroup = [];
                    _.forEach(fields.files, file=>mediaGroup.push({ type: 'photo', media: `attach://./uploadedCars/${tempDir}/${file}`}));
                    await bot.sendMediaGroup(-1001204370141, mediaGroup);
                } catch(err) {
                    console.log(err.code);
                }

                //-- Закончили получать форму
                reply.code(200).send();
            });

            mp.on('field', (field, value)=>{
                fields[field] = value;
            });
        });

      fastify.post('/api/sendRequest',  async(req, reply) => {
        let bot = new TelegramBot(botToken, {
          polling: true
        });
        let data = req.body;
        try {
          let dt = moment().utc().utcOffset(5).format('DD.MM.YYYY HH:mm');
          await bot.sendMessage(-1001397757254, `${dt}\n${data.fio}\n<a href="tel:${data.phone}">${data.phone}</a>`, { parse_mode: 'HTML' });
        } catch(err) {
          //console.log(err.code);
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
