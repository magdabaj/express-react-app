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
    client.query('SELECT * FROM user_images', (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(Object.values(res2.rows));
        }
    });
});

router.get('/:imgId', (req, res) => {
    let id = parseInt(req.params.imgId);
    client.query(`SELECT * FROM user_images WHERE image_id=${id}`, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(Object.values(res2.rows))
        }
    });
});

router.post('/', (req, res) => {
    let album_id = req.body.album_id;
    let title = req.body.title;
    let url = req.body.url;
    let user_id = req.body.user_id;
    let is_profile_img = req.body.is_profile_img;
    let sql = 'INSERT INTO user_images (album_id, title, url, user_id, is_profile_img) VALUES ($1, $2, $3, $4, $5)';
    let params = [ album_id, title, url, user_id, is_profile_img];
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
    let url = req.body.url;
    let image_id = req.body.image_id;
    let user_id = req.body.user_id;
    let is_profile_img = req.body.is_profile_img;
    let sql = 'UPDATE user_images SET album_id = $1,title = $2, url = $3, user_id = $5, is_profile_img = $6 WHERE image_id = $4';
    let params = [album_id, title, url, image_id, user_id, is_profile_img];
    client.query(sql, params, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows);
            res.send(Object.values(res2.rows));
        }
    });
});
router.delete('/:imgId', (req, res) => {
    let image_id = req.params.imgId;
    let sql = 'DELETE FROM user_images WHERE image_id = $1';
    let params = [image_id];
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