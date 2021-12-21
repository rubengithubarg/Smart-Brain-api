const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'smart-brain'
    }
});

postgres.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/singnin', (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        } else {
            res.status(400).json('error logging in');
        }
})

app.post('/register', (req, res) => {
    const {email, name, password } = req.body;
    db.('users').insert({
        email: email,
        name: name,
        password: password,
        joined: new Date()
    }).then(console.log)
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
        const { id } = req.params;
        let found = false;
        database.users.forEach(user => {
            if( user.id === id){
                res.json(user);

                return res.json(user);
            }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if( user.id === id){
            user.entries++;
            return res.json(user.entries);
        }
})
if (!found) {
    res.status(400).json('not found');
}
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})