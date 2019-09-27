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
    client.query('SELECT * FROM albums', (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(Object.values(res2.rows));
        }
    });
});

router.get('/:albumId', (req, res) => {
    let id = parseInt(req.params.albumId);
    client.query(`SELECT * FROM albums WHERE album_id=${id}`, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(Object.values(res2.rows))
        }
    });
});

router.post('/', (req, res) => {
    let title = req.body.title;
    let user_id = req.body.user_id;
    let sql = 'INSERT INTO albums (title, user_id) VALUES ($1, $2)';
    let params = [ title, user_id];
    client.query(sql, params, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(Object.values(res2.rows));
        }
    });
});
router.put('/', (req, res) => {
    let album_id = req.body.album_id;
    let title = req.body.title;
    let user_id = req.body.user_id;
    let sql = 'UPDATE albums SET user_id = $1,title = $2 WHERE album_id = $3';
    let params = [user_id, title, album_id];
    client.query(sql, params, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(Object.values(res2.rows));
        }
    });
});
router.delete('/:albumId', (req, res) => {
    let album_id = req.params.albumId;
    let sql = 'DELETE FROM albums WHERE album_id = $1';
    let params = [album_id];
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