import mongoose from "mongoose";
import { catchError, createStatusError } from "../utils/helperFunctions.js";

export const verifyId = catchError((req) => {
    const isIdVerified = mongoose.isValidObjectId(req.params.id);

    if (!isIdVerified) throw createStatusError("Id is not verified");

    req.verifiedId = req.params.id;
});