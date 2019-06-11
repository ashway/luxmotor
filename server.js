const fastify = require('fastify')({ logger: { level: 'error' } });
const Next = require('next');
const TelegramBot = require('node-telegram-bot-api');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

fastify.register(require('fastify-cors'), {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
});

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

      fastify.post('/api/sendRequest',  async(req, reply) => {
        let bot = new TelegramBot('556896286:AAH791dcePJHlImFEs3HYryHa8HDRljMyW4', {
          polling: false,
          request: {
            proxy: 'sock5://2.234.226.32:17779'
          }});
        let data = req.body;
        try {
          await bot.sendMessage(-1001397757254, `${new Date().toLocaleString('ru')}\n${data.fio}\n<a href="tel:${data.phone}">${data.phone}</a>`, { parse_mode: 'HTML' });
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
