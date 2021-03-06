
const User = require('../models/User')
const CryptoJs = require('crypto-js')



const updateUser = async (req, res) => {
    if (req.body.password) {

        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    }
    try {

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
            $set: req.body
        },
            { new: true }
        );

        res.status(200).json({ status: "success", ...updatedUser._doc });
    } catch (error) {
        res.status(500).json(error);
    }
}
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);

    } catch (error) {
        res.status(500).json(error);
    }
}
const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json(error);

    }
}

module.exports = { updateUser, getUser, getAllUser }