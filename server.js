
const fs = require('fs');
const fastify = require('fastify')({ logger: { level: 'error' } });
const moment = require('moment');
const Next = require('next');
const Telegraf = require('telegraf');
const _ = require('lodash');
const pump = require('pump');
const uuid = require('uuid/v1');
const carModels = require('./infolib/carmodels');

fastify.register(require('fastify-multipart'));

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

let selfURL = 'https://lux-motor.ru';
let botToken = '556896286:AAH791dcePJHlImFEs3HYryHa8HDRljMyW4';
let chatId = '-1001397757254';
if(dev) {
    selfURL = 'https://dev.lux-motor.ru';
    botToken = '659727031:AAFZ_8AXLTu2bBSej7_2UN5ujjlVQPsLggk';
    chatId = '-1001204370141';
}

fastify.register(require('fastify-cors'), {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
});




fastify.register((fastify, opts, next) => {
    const app = Next({ dev });

    let handleCar = (req, reply) => {
        if(carModels[req.params.model]) {
            return app.render(req.req, reply.res, '/cars', req.query).then(() => {
                reply.sent = true;
            })
        } else {
            return app.render404(req.req, reply.res).then(() => {
                reply.sent = true;
            })
        }
    };

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
                    fields.phoneRaw = fields.phone.replace(/\s+|\+|\(|\)/g, '');
                    let bot = new Telegraf(botToken/*, { telegram: { agent: socksAgent } }*/);
                    try {
                    let dt = moment().utc().utcOffset(5);
                    await bot.telegram.sendMessage(chatId, `Зарегистрировался новый водитель!\n${dt.format('DD.MM.YYYY')}\n${dt.format('HH:mm')}\n${fields.name}\n<a href="tel:${fields.phoneRaw}">${fields.phone}</a>\nОжидаемый гонорар: ${fields.price} руб.`, { parse_mode: 'HTML' });
                    let mediaGroup = [];
                    _.forEach(fields.files, file=>{
                        mediaGroup.push({
                            'media': `${selfURL}/static/uploadImg/${tempDir}/${file}`,
                            'type': 'photo'
                        });
                    });
                    await bot.telegram.sendMediaGroup(chatId, mediaGroup);
                    } catch(err) {
                        console.log(err);
                    }
                    reply.code(200).send();
                });

                mp.on('field', (field, value)=>{
                    fields[field] = value;
                });
            });

          fastify.post('/api/sendRequest',  async(req, reply) => {
            let data = req.body;
            let bot = new Telegraf(botToken/*, { telegram: { agent: socksAgent } }*/);
            try {
              data.phoneRaw = data.phone.replace(/\s+|\+|\(|\)/g, '');

              let dt = moment().utc().utcOffset(5);
              await bot.telegram.sendMessage(chatId, `Заявка с сайта!\n${dt.format('DD.MM.YYYY')}\n${dt.format('HH:mm')}\n${data.fio}\n<a href="tel:${data.phoneRaw}">${data.phone}</a>`, { parse_mode: 'HTML' });
            } catch(err) {
              console.log(err.code);
            }

            reply.header('Content-Type', 'application/json').code(200);
            reply.send({ result: true });
          });

          fastify.get('/service/:serviceName', (req, reply) => {

              console.log(req.params.serviceName);

              if(_.includes(['premium','minivan','retro','bus','cortege','wedding','transfer','business','meeting'], req.params.serviceName)) {
                  return app.render(req.req, reply.res, '/service', req.query).then(() => {
                      reply.sent = true;
                  })
              } else {
                  return app.render404(req.req, reply.res).then(() => {
                      reply.sent = true;
                  })
              }
          });

          fastify.get('/cars/:model', handleCar);
          fastify.get('/cars/:class/:model', handleCar);

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
});

fastify.listen(port, err => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
});
