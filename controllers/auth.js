
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {

    if (!req.body.password) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({
            "status": "Failed",
            "message": "Password Field is required"
        });
        return;

    }
    if (!req.body.username) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({
            "status": "Failed",
            "message": "username Field is required"
        });
        return;

    }
    if (!req.body.email) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({
            "status": "Failed",
            "message": "email Field is required"
        });
        return;

    }
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY),

    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json({
            "status": "success",
            ...savedUser._doc
        });
    } catch (error) {
        let customMessage = error.message;
        if (error.index == 0) {
            customMessage = "Account is Already in Use";
        }
        res.status(500).json({ "status": "Failed", "message": customMessage });

    }
};


const login = async (req, res) => {
    if (!req.body.password) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({
            "status": "Failed",
            "message": "Password Field is required"
        });
        return;

    }
    if (!req.body.username) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({
            "status": "Failed",
            "message": "username Field is required"
        });
        return;

    }
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "Not Found"
            });
        }

        const hasedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

        const { password, ...others } = user._doc;

        if (hasedPassword.match(req.body.password)) {
            const accesssToken = jwt.sign({
                id: user.id,
                isAdmin: user.isAdmin
            },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '3d' }
            );

            res.status(200).json({
                "status": "Success",
                ...others,
                'token': accesssToken
            });
        }
        else {
            res.status(401).json({ "status": "Failed", "message": "wrong creds" });
        }


    } catch (error) {
        res.status(500).json(error);

    }
}

module.exports = { register, login }