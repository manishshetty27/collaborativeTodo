const {z} = require("zod")

const signUpValidation = z.object({
    userName: z.string().min(3).max(15),
    name: z.string().min(2).max(20),
    email: z.string().email(),
    password: z.string().min(8)
})

const signInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

module.exports = {
  signUpValidation,
  signInValidation
}