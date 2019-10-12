let express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Client} = require('pg');

// Load user model

const User = require("../models/User");

const client = new Client({
    user: 'magda',
    host: 'localhost',
    database: 'users',
    password: 'magda',
    port: 5432,
});
client.connect();

router.get('/', (req, res, next) => {
    client.query('SELECT * FROM users', (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(Object.values(res2.rows));
        }
    });
});

router.get('/:userId', (req, res) => {
    let id = parseInt(req.params.userId);
    client.query(`SELECT * FROM users WHERE user_id=${id}`, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(Object.values(res2.rows))
        }
    });
});

router.post("/register", async (req, res) => {
    let name = req.body.name;
    let surname = req.body.surname;
    let email = req.body.email;
    let join_date = new Date();
    let login = req.body.login;
    let password = req.body.password;
    let hashedPassword = await hashPassword(password);

    let sql = 'INSERT INTO users (name, surname, email, join_date, password, login) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            let params = [name, surname, email, join_date, hashedPassword, login];

            client.query(sql, params, (err, res2) => {
                if (err) {
                    console.log(err.stack)
                } else {
                    console.log('new user',res2.rows);
                    res.send(res2.rows[0]);
                }
            })
});

    async function hashPassword (password) {

        const saltRounds = 10;
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                if (err) reject(err);
                resolve(hash)
            });
        });

        return hashedPassword;
    }

    //
    // User.findOne({ email: req.body.email }).then(user => {
    //     if (user) {
    //         return res.status(400).json({ email: "Email already exists" });
    //     } else {
    //         const newUser = new User({
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: req.body.password
    //         })
    //     }
    // });
    //
    // // Hash password before saving in database
    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(password, salt, (err, hash) => {
    //         if(err) throw err;
    //         newUser.password = hash;
    //         newUser
    //             .save()
    //             .then(user => res.json(user))
    //             .catch(err => console.log(err));
    //     })
    // })


router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(password);
    let sql = 'SELECT * FROM users WHERE email=$1 ';
    let params = [email];

    client.query(sql, params, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            if(res2.rows[0]) {
                console.log('user', res2.rows);
                bcrypt.compare(password, res2.rows[0].password).then(isMatch => {
                    if (isMatch) {
                        // User matched
                        // Create JWT Payload
                        const payload = {
                            id: res2.rows[0].user_id,
                            name: res2.rows[0].name
                        };
                        console.log('payload', payload);
                        res.send(res2.rows[0]);
                    }
                })
            }
        }
    })

});

router.post('/', (req, res) => {
    let name = req.body.name;
    let surname = req.body.surname;
    let email = req.body.email;
    let join_date = new Date();
    let sql = 'INSERT INTO users (name, surname, email, join_date) VALUES ($1, $2, $3, $4) RETURNING *';
    let params = [ name, surname, email, join_date];
    client.query(sql, params, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log('new user',res2.rows);
            res.send(res2.rows[0]);
        }
    });
});

router.put('/', (req, res) => {
    let name = req.body.name;
    let surname = req.body.surname;
    let email = req.body.email;
    let user_id = req.body.user_id;
    let edit_date = new Date();
    let sql = 'UPDATE users SET name = $1,surname = $2, email = $3, edit_date = $4 WHERE user_id = $5 RETURNING *';
    let params = [name, surname, email, edit_date, user_id];
    client.query(sql, params, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(res2.rows[0]);
        }
    });
});

router.delete('/:userId', (req, res) => {
    let user_id = req.params.userId;
    let sql = 'DELETE FROM users WHERE user_id = $1';
    let params = [user_id];
    client.query(sql, params, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(Object.values(res2.rows));
        }
    });
});

module.exports = router;