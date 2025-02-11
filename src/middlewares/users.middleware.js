import User from "../models/User.js";
import { catchError, createStatusError } from "../utils/helperFunctions.js";
import {
  updateMeValidator,
  updateValidator,
} from "../validators/users.validator.js";

export function hasRole(...roles) {
    return catchError((req, _) => {
        let hasRole = false;

        for (let role of roles) {
            if (role === req.user.role) {
                hasRole = true;
                break;
            }
        }

        if (!hasRole) throw createStatusError("Forbidden", 403);
    });
}

export const doesUserExist = catchError(async (req) => {
    const user = await User.findOne({ _id: req.verifiedId });

    if (!user) throw createStatusError("User not found", 404);

    user.password = null;

    req.foundUser = user;
});

export const validateUpdateMe = catchError(async (req) => {
    const validatedUpdateMe = await updateMeValidator.validate(req.body);

    req.validatedUpdateMe = validatedUpdateMe;
});

export const validateUpdate = catchError(async (req) => {
    const validatedUpdate = await updateValidator.validate(req.body);

    req.validatedUpdate = validatedUpdate;
});

export const isUserVerified = catchError(async (req, _) => {
  if (!req.user.isVerified && req.user.verifyToken !== "")
    throw createStatusError("User is not verified", 400);
});
