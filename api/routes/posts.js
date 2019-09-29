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
    client.query('SELECT * FROM posts', (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(Object.values(res2.rows));
        }
    });
});

router.get('/:postId', (req, res) => {
    let id = parseInt(req.params.postId);
    client.query(`SELECT * FROM posts WHERE post_id=${id}`, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(Object.values(res2.rows))
        }
    });
});

router.post('/', (req, res) => {
    let body = req.body.body;
    let user_id = req.body.user_id;
    let private = req.body.private;
    let add_date = new Date();
    let sql = 'INSERT INTO posts (body, user_id, private, add_date) VALUES ($1, $2, $3, $4) RETURNING *';
    let params = [ body, user_id, private, add_date];
    client.query(sql, params, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(res2.rows[0]);
        }
    });
});
router.put('/', (req, res) => {
    let post_id = req.body.post_id;
    let body = req.body.body;
    let user_id = req.body.user_id;
    let private = req.body.private;
    let edit_date = new Date();
    let sql = 'UPDATE posts SET user_id = $1, body = $2, private = $3, edit_date = $4 WHERE post_id = $3 RETURNING *';
    let params = [user_id, body, private, edit_date, post_id];
    client.query(sql, params, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(res2.rows[0]);
        }
    });
});
router.delete('/:postId', (req, res) => {
    let post_id = req.params.postId;
    let sql = 'DELETE FROM posts WHERE post_id = $1';
    let params = [post_id];
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