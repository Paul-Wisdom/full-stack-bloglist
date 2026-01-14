const express = require('express')
const app = express()

const cors = require('cors')
const morgan = require('morgan');
require('express-async-errors');

const blogRouter = require('./server/controllers/blog');
const userRouter = require('./server/controllers/user');
const loginRouter = require('./server/controllers/login');
const middlewares = require('./server/utils/middleware');
const resetRouter = require('./server/controllers/reset');


app.get('/health', (req, res) => {
  res.status(200).json({status: 'ok'});
})

app.use(express.static('dist'));
morgan.token('data', (req) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body);
  }
  return ' ';
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
if (process.env.NODE_ENV === 'test') {
  app.use('/api/reset', resetRouter);
}
//add unknownRoute, errorhandler and requestlogger i.e morgan middleware
app.use(middlewares.unknownEndPoint);
app.use(middlewares.errorHandler);
module.exports = app;