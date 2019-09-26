let express = require('express');
let router = express.Router();
const {Client} = require('pg');

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

router.post('/', (req, res) => {
    let name = req.body.name;
    let user_id = req.body.user_id;
    return res.send({user_id: user_id, name: name});
});
router.put('/', (req, res) => {
    return res.send('PUT HTTP method on user resource');
});
router.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    delete (id);
     res.send('DELETE HTTP method on user resource');
});

module.exports = router;