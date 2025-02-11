import vine from "@vinejs/vine";

const loginScheme = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});

export const loginValidator = vine.compile(loginScheme);

const signupScheme = vine.object({
  username: vine.string().optional(),
  email: vine.string().email(),
  password: vine.string(),
});

export const signupValidator = vine.compile(signupScheme);