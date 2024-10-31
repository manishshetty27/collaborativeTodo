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
}

const userSignin = async ( req ,res) =>

