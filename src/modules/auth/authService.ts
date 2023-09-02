import { Secret } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";

import APIError from "../../errorHelpers/APIError";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "../../interfaces/login";
import { createToken, verifyToken } from "../../shared/jwtHelper";
// import { IUser } from "../user/userInterface";
// import { User } from "../user/userModel";
import {
    Prisma, User,
} from '@prisma/client';
import prisma from "../../shared/prisma";

// creating user
export const createUserService = async (user: User): Promise<User | null> => {
  const hashedPassword = await bcrypt.hash(user?.password,  Number(config.bycrypt_salt_rounds));
    user.password = hashedPassword;

    const result = await prisma.user.create({
        data: user,
    });
  if (!result) {
    throw new APIError(400, "failed to create User");
  }
  return result;
};
// getByemail
const getByEmailFromDB = async (email: string): Promise<User | null> => {
    const result = await prisma.user.findUnique({
        where: {
            email
        }
    });
    return result;
};
// checkPassword
const checkPassword = async (givenPassword: string,savedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(givenPassword, savedPassword);
};

// login
export const loginUserService = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await getByEmailFromDB(payload?.email);

  if (!isUserExist) {
    throw new APIError(404, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await checkPassword(password, isUserExist.password))
  ) {
    throw new APIError(401, "Password is incorrect");
  }

  //create access token & refresh token

  const { id: userId, role } = isUserExist;
  const token = createToken(
    { userId, role, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { userId, role, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    token,
    refreshToken,
  };
};
// getrefresh
export const getRefreshTokenService = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (err) {
    throw new APIError(403, "Invalid Refresh Token");
  }

  const { email } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await getByEmailFromDB(email);
  if (!isUserExist) {
    throw new APIError(404, "User does not exist");
  }
  //generate new token

  const newAccessToken = createToken(
    {
        userId: isUserExist.id,
      role: isUserExist.role,
      email: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

