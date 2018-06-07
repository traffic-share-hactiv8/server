const User = require('../models/users');
const jwt = require('jsonwebtoken');


module.exports = {
    registerUser: (req, res) => {
        const { name, username, password, email } = req.body
        let user = new User({
            name,
            username,
            password,
            email,
            isActive: true
        })
        user.save()
            .then(function (result) {
                res.status(201).json({ message: "create user success", result })
            })
            .catch(function (err) {
                res.status(500).json({ error: err })
            })
    },
    loginUser: (req, res) => {
        const { username, password } = req.body
        User.findOne({ username })
            .then(function (user) {
                if (user) {
                    user.comparePassword(password, function (err, isMatch) {
                        if (err) res.status(500).json({ error: err });
                        if (isMatch) {
                            //get token from jwt
                            let token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, {
                                expiresIn: 86400 //expires in 24 hours
                            })
                            res.status(200).json({ message: 'Login Success', auth: true, token });
                        } else {
                            res.status(401).json({ message: 'Incorrect username/password', auth: false, token: null });
                        }
                    })
                } else {
                    res.status(404).json({ message: 'username Not Found', auth: false, token: null });
                }
            })
            .catch(function (err) {
                res.status(500).json({ error: err });
            })
    },
    getAlluser : (req,res)=>{
        User.find()
        .then(users=>{
            res.status(200).json({message: 'retrieve all user success', users})
        })
        .catch(err=>{
            res.status(400).json({error:err})
        })
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        User.findById({ _id: id })
            .then(user => {
                res.status(200).json({ message: 'Fetch User Success', user })
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    },
    updateUser: (req, res) => {
        const id = req.params.id;
        const updateOps = {}
        for (const key in req.body) {
            updateOps[key] = req.body[key]
        }
        User.findByIdAndUpdate({ _id: id }, {
            $set: { updateOps }
        })
            .then(result => {
                res.status(200).json({ message: "update success!", result })
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    },
    deactivatedUser: (req, res) => {
        const id = req.user.id;
        console.log(req.user)
        User.findByIdAndUpdate({ _id: id }, { $set: { isActive: false } })
            .then(result => {
                res.status(200).json({ message: "deactived user success", result })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    },
    activatedUser : (req, res) => {
        const id = req.user.id;
        User.findByIdAndUpdate({ _id: id }, { $set: { isActive: true } })
            .then(result => {
                res.status(200).json({ message: "Activated user success", result })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }
}