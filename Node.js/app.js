var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { graphqlHTTP } = require('express-graphql');
const {buildSchema} = require('graphql')
const data = require("./data/data.json")

const schema = buildSchema(`
    type Name {
      name: String
      lat: String
      lng: String
    }

    type Query {
      getName(str: String):[Name]
    }
`)

const filterStr = (str) => {
  let ans = []
  for(let i = 0; i < data.length; i++){
    let t = data[i].name.toLocaleLowerCase()
    if(t.indexOf(str) === 0){
      ans.push(data[i])
    }
  }
  return ans;
}

const root = {
  getName({str}) {
    return filterStr(str)
  }
}
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*',function(req,res,next){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  // res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(
  '/query',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  }),
); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
