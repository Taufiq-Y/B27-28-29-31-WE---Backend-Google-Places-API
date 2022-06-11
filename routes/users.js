const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Registering the user
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
// saving user & displaying the repsonse
        const user = await newUser.save();
        res.status(200).json(user._id)
    } catch (error) {
        console.log(err);
        res.status(500).json(err)
    }
})

// Loging User
router.post("/login", async (req, res) => {
    try {
        //Finding user
        const user = await User.findOne({ username: req.body.username});
        !user && res.status(400).json("Wrong username..!!!")

        //Validation of password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(400).json("Wrong Password..!!")
        res.status(200).json({_id: user._id, username: user.username })
    } catch (error) {
        res.status(500).json(err)
    }
})

module.exports = router;