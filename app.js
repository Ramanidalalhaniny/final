require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./server/config/db');
const app = express();
const PORT = process.env.PORT || 9000;
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
}));
app.use(express.static('public'));
app.use(expressLayout);
app.set('layout', './main');
app.set('view engine', 'ejs');
app.locals.isActiveRoute = require('./dp').isActiveRoute;
app.use('/', require('./main'));
app.use('/', require('./jsadmin'));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
