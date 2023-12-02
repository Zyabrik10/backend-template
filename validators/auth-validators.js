import vine from "@vinejs/vine";

// Signup
const signupScheme = vine.object({
  username: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(1).maxLength(32),
});

export const signupValidator = vine.compile(signupScheme);

// Signup
const signinScheme = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});

export const signinValidator = vine.compile(signinScheme);
