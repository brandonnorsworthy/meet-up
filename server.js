const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const {
	Post
} = require('./models')

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
	secret: 'Super secret secret',
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({
extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.get('/home', function (req, res) {
	Post.findAll({}).then(function (data, err) {
		console.log('err and data', err, data);
		res.render('homepage', {
			posts: data
		})
	})
})

app.get('/about', function (req, res) {
	res.render('painting')
})

app.get('/api/posts', function (req, res) {
	console.log('POST MODEL', Post)
})

sequelize.sync({
	force: false
}).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});