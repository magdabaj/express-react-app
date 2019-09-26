let express = require('express');
let router = express.Router();

let messages = {
    1: {
        id: '1',
        text: 'Hello World',
        userId: '1',
    },
    2: {
        id: '2',
        text: 'By World',
        userId: '2',
    },
};

router.get('/', (req, res) => {
    res.send(Object.values(messages));
});

module.exports = router;