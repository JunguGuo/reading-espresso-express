const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

const app = express();

app.use(cors());

const readRouter = require('./routes/readRoutes');
const userRouter = require('./routes/userRoutes');
const tapeRouter = require('./routes/tapeRoutes');
const viewsRouter = require('./routes/viewRoutes');
const puzzleRouter = require('./routes/puzzleRoutes');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
// Middleware

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(compression());

// ROUTES
app.use('/', viewsRouter);

app.use('/api/v1/reads', readRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tapes', tapeRouter);
app.use('/api/v1/puzzles', puzzleRouter);
module.exports = app;
