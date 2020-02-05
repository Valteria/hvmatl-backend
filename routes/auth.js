const express = require('express');
const bodyParser = require('body-parser');

const bcrypt = require('bcryptjs');
const {createToken} = require('../utils/authUtils');

//Setup router
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//user user model schema
const User = require('../model/User');

router.post('/', (req, res) => {
    return User.findOne({username:req.body.username}, (err, user) => {
        if(err)
            return res.status(500).send('Internal Server Error: Unable to authenticate');
        if(user === null) {
            return res.status(400).send('User does not exist');
        }
        console.log(req.body.password);
        console.log(user.password);
        return bcrypt.compare(req.body.password, user.password, (err, success) => {
            if(err) {
                console.log(err);
                return res.status(500).send('Internal Server Error: Unable to authenticate');
            }
            if(success) {    
                console.log('success');
                const token = createToken({id: user._id, username: user.username});
                return res.status(200).send({id: user._id, token: token}); 
            }
        })
    });
});

module.exports = router;