const { z } = require("zod");

const signUpValidation = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signInValidation = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

module.exports = {
  signUpValidation,
  signInValidation,
};
