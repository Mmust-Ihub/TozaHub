import httpStatus from "http-status";
import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/APiError.js";

export const createUser = async (userBody) => {
  if (await userModel.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "email is already taken ...");
  }
  return await userModel.create(userBody);
};
export const getUserById = async (userId) => {
  return await userModel.findById(userId);
};
