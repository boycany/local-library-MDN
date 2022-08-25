const createError = require('http-errors')
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const catalogRouter = require('./routes/catalog')

mongoose
  .connect("mongodb://localhost:27017/local-library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb.");
  })
  .catch((e) => {
    console.log(e);
  });

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next){
    next(createError(404))
})

//error handler
app.use(function(err, req, res, next){
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
