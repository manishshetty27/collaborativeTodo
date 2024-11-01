const express = require("express")
const signUpValidation = require("../validation/userValidation")
const signInValidation = require("../validation/userValidation")
const User = require("../Schema/UserSchema")
const UserTodo = require("../Schema/UserSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const JWT_SECRET = (process.env.JWT_SECRET)

const userSignup = async (req, res) => {
    try {
        const { userName, name, email, password } = req.body
        const parsedData = signUpValidation.safeParse(req.body)
        if (!parsedData.success) {
            return res.json({
                message: "Incorrect format",
                error: parsedData.error
            })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went Wrong" })
        console.log(error)
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 5)
    }
    catch (e) {
        res.status(500).json({
            message: "error while hashing"
        })
    }

    try {
        await User.create({
            email: email,
            password: hashedPassword,
            name: name
        });

        res.status(200).json({
            message: "You are signed up"
        })

    } catch (e) {
        res.status(500).json({
            message: "User already exists"
        })
    }
}

const userSignin = async (req, res) => {
    try {
        const { userName, name, email, password } = req.body
        const parsedData = signInValidation.safeParse(req.body)
        if (!parsedData.success) {
            return res.json({
                message: "Incorrect format",
                error: parsedData.error
            })
        }
    }
    catch (error) {
        res.status(400).json({ message: "Something went Wrong" })
        console.log(error)
    }

    const findUser = await User.findOne({ email: email });
    console.log(findUser)
    if (!findUser) {
        return res.status(403).json({ message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);

    if (passwordMatch) {
        const token = jwt.sign({ id: findUser._id.toString() }, process.env.JWT_SECRET, {
            expiresIn: "15d"
        })
        return res.json({ msg: "You are logged in", token });
    } else {
        return res.status(403).json({ message: "Incorrect password" });
    }
};


