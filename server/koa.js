import koa from 'koa';
import debug from 'debug';
import send from 'koa-send';
import staticCache from 'koa-static-cache';

const env = process.env.NODE_ENV || 'development';

let app = module.exports = koa();
let config = require('./config')[env]

require('./config/middleware')(app);

app.use(staticCache(config.distPath, {maxAge: 365 * 24 * 60 * 60}))
app.use(staticCache(config.appPath, {maxAge: 365 * 24 * 60 * 60}))

app.use(function* index() {
  yield send(this, config.rootPath + '/index.html');
});

let server = app.listen(3000);
require('./socket.io')(server, config)
