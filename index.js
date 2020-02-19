const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const globalErrHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const { NOTFOUND } = require('./config/constants');

const app = express();
// configuration ===============================================================
app.set('port', process.env.PORT || 3000);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/api/v1', routes);

// handle undefined Routes
app.use('*', (req, res, next) => {
  const err = new AppError(NOTFOUND, 'fail', 'undefined route');
  next(err, req, res, next);
});
app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
})
app.use(globalErrHandler);

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ', app.get('port'));
});
