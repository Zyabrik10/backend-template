import vine from "@vinejs/vine";

const updateMeScheme = vine.object({
  username: vine.string().optional(),
  avatar: vine.string().optional(),
  email: vine.string().email().optional(),
});

export const updateMeValidator = vine.compile(updateMeScheme);

const updateScheme = vine.object({
  username: vine.string().optional(),
  avatar: vine.string().optional(),
  email: vine.string().email().optional(),
  role: vine.enum(["admin", "moderator", "user"]).optional(),
});

export const updateValidator = vine.compile(updateScheme);
