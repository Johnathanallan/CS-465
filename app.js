// app.js
// Minimal Express app wired for server-rendered pages + /api with CORS for Angular (4200)

const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const hbs           = require('hbs');

// Routers
const indexRouter   = require('./app_server/routes/index');
const usersRouter   = require('./app_server/routes/users');
const travelsRouter = require('./app_server/routes/travel');
const apiRouter     = require('./app_api/routes/index');

// DB (Mongoose connection)
require('./app_api/models/db');

const app = express();

/* ---------- View engine ---------- */
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

/* ---------- Middleware ---------- */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Public assets (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Explicit images mount (useful for Angular image src="/images/xyz.jpg")
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

/* ---------- CORS for API (Angular dev on 4200) ---------- */

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use('/api', require('./app_api/routes/index'));
/* ---------- Routes ---------- */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelsRouter);
app.use('/api', apiRouter);

/* ---------- 404 ---------- */
app.use((req, res, next) => {
  next(createError(404));
});

/* ---------- Error handler ---------- */
app.use((err, req, res, next) => {
  // Provide error only in development
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  // For API requests, return JSON
  if (req.path.startsWith('/api')) {
    const status = err.status || 500;
    return res.status(status).json({
      status,
      error: res.locals.error?.message || 'Internal Server Error'
    });
  }

  // Render the error page for server-rendered routes
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
