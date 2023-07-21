import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/User";
import bcrypt from "bcrypt";


export const getAuth :RequestHandler =async (req,res,next) => {
    const authUserId = req.session.userId
    try {
        if(!authUserId){
            throw createHttpError(401, "Not Authenticated")
        }

        const user = await UserModel.findById(authUserId).exec()
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}




interface RegisterBody {
  email?: string;
  password?: string;
}

export const register: RequestHandler<
  unknown,
  unknown,
  RegisterBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!passwordRaw || !email) {
      throw createHttpError(400, "Parameters missing");
    }
    const existingUser = await UserModel.findOne({ email: email }).exec();
    if (existingUser) {
      throw createHttpError(
        409,
        "Email has already Registered try another one!"
      );
    }

    const hashedPassword = await bcrypt.hash(passwordRaw, 10);
    const newUser = await UserModel.create({
      email: email,
      password: hashedPassword,
    });

    req.session.userId = newUser._id;
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
interface loginBody {
  email?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  loginBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!password || !email) {
      throw createHttpError(400, "Parameters missing");
    }
    const user = await UserModel.findOne({ email: email })
      .select("+password")
      .exec();
    if (!user) {
      throw createHttpError(401, "Inivalid Credentils");
    }
    if (!user.password) {
        throw createHttpError(401, "Inivalid Credentils");
      }

    const matchpass = await bcrypt.compare(password, user.password);

    if(!matchpass){
        throw createHttpError(401, "Inivalid Credentils");
    }

    req.session.userId = user._id
    res.status(201).json(user)
  } catch (error) {
    next(error);
  }
};

export const logout:RequestHandler =async (req,res,next) => {
    req.session.destroy(error =>{
        if(error){
            next(error)
        }else{
            res.sendStatus(200)
        }
    })
}
