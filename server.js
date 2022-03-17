const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'smart-brain'
    }
});


const app = express();

app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => { res.send('Its working') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, postgres, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, postgres, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, postgres)})
app.put('/image', (req, res) => { image.handleImage(req, res, postgres)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})