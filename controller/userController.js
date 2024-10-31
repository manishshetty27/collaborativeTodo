const express = require("express")
const signUpValidation = require("../validation/userValidation")
const signInValidation = require("../validation/userValidation")
const User = require("../Schema/Schema")
const UserTodo = require("../Schema/Schema")
const TeamTodo = require("../Schema/Schema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const JWT_SECRET = (process.env.JWT_SECRET)

const userSignup = async (req, res) => {
    try {
        const parsedData = signUpValidation.safeParse(req.body)
        if (!parsedData.success) {
            return res.json({
                message: "Incorrect format",
                error: parsedData.error
            })

        }

        const {userName, name, email, password} =req.body
    }
    catch (error) {
        res.status(500).json({ message: "Something went Wrong" })
        console.log(error)
    }

    try {
    const hashedPassword = await bcrypt.hash(password, 5)
}
catch(e){
    res.status(500).json({
        message: "error while hashing"
    })
}

    try {
        await UserModel.create({
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



