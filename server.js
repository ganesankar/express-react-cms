const express = require('express');
const app = express();
const cors = require('cors');
const ejs = require('ejs');
const router = express.Router();

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.set('views', __dirname + '/');
app.use(cors());

app.use(express.static('build', {
    setHeaders: res => res.req.path.split("/")[1] === "static" && res.setHeader('Cache-Control', 'max-age=31536000')
}));
app.use(express.static('adminPublic'))

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
app.get("/admin", (req, res) => {
    return res.sendFile(__dirname+'/adminPublic/index.html', err => (err.status === 404) ? res.status(404).send("<b>Error: </b>Seems like there is currently no build present for this project. Please run <code>npm run build</code> and restart the server in order to continue. Thank you.") : res.status(500).send("Internal Server Error"));
});
app.use('/login', require('./src/login'));
app.use('/install', require('./src/install'));
app.get("*", (req, res) => {
    return res.sendFile(__dirname+'/build/index.html', err => (err.status === 404) ? res.status(404).send("<b>Error: </b>Seems like there is currently no build present for this project. Please run <code>npm run build</code> and restart the server in order to continue. Thank you.") : res.status(500).send("Internal Server Error"));
});

app.listen(process.env.PORT || 4000, () => console.log(`Server is listening on port ${process.env.PORT || 4000}`));
