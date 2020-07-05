const express = require('express');
const app = express();
const cors = require('cors');
const ejs = require('ejs');
var compression = require('compression');
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.set('views', __dirname + '/');
app.use(cors());

app.use('/',express.static('build', {
    setHeaders: res => res.req.path.split("/")[1] === "static" && res.setHeader('Cache-Control', 'max-age=31536000')
}));

app.use('/admin',express.static('admin', {
    setHeaders: res => res.req.path.split("/")[1] === "assets" && res.setHeader('Cache-Control', 'max-age=31536000')
}));
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.JWT_SERVER_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use('/api', require('./src/server'));
app.use('/api/pages', require('./src/server/pages'));
app.use('/api/user', require('./src/server/user'));
app.use('/api/blog', require('./src/server/blog'));
app.use('/api/category', require('./src/server/category'));
app.use('/api/comments', require('./src/server/comments'));
app.use('/api/messages', require('./src/server/messages'));
app.use('/api/portfolio', require('./src/server/portfolio'));
app.use('/api/settings', require('./src/server/settings'));
app.use('/api/events', require('./src/server/settings'));

app.use('/login', require('./src/login'));
app.use('/install', require('./src/install'));


app.listen(process.env.PORT || 4000, () => console.log(`Server is listening on port ${process.env.PORT || 4000}`));
