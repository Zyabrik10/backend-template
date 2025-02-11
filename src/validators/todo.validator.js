import vine from "@vinejs/vine";

const createTodoScheme = vine.object({
  message: vine.string()
});

export const createTodoValidator = vine.compile(createTodoScheme);

const updateTodoScheme = vine.object({
  message: vine.string().optional(),
  isDone: vine.boolean().optional(),
});

export const updateTodoValidator = vine.compile(updateTodoScheme);