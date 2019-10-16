const passport = require("passport");
const Pool = require("pg").Pool;

const dbConfig = {
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    port: config.db.port,
    max: config.db.max,
    idleTimeoutMillis: config.db.idleTimeoutMillis,
}

const pool = new Pool(dbConfig);

pool.on('error', function (err) {
    winston.error('idle client error', err.message, err.stack)
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
};

passport.use(new LocalStrategy((username, password, cb) => {
    pool.query('SELECT id, username, password, type FROM users WHERE email=$1', [email], (err, result) => {
        if(err) {
            winston.error('Error when selecting user on login', err)
            return cb(err)
        }

        if(result.rows.length > 0) {
            const first = result.rows[0]
            bcrypt.compare(password, first.password, function(err, res) {
                if(res) {
                    cb(null, { id: first.id, username: first.username, type: first.type })
                } else {
                    cb(null, false)
                }
            })
        } else {
            cb(null, false)
        }
    })
}))