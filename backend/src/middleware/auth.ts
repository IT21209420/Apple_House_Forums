// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import express, { NextFunction, Request, Response } from "express";

// const authenticateToken = (req:Request, res:Response, next:NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(" ")[1]; //reject bearer word

//     //verify the token.
//     jwt.verify(token, process.env.SECRET, async (err, payload) => {
//       try {
//         if (err) {
//           return res.status(401).json({ error: "Unathorized!" });
//         }
//        const id : string = payload!._id.toString();

//         //find user
//         try {
//           const user = await User.findOne({ _id: payload!._id }).select(
//             "-password"
//           ); //remove password
//           //attaching the user to the req.user
//           req.user = user;
//           next();
//         } catch (error) {
//           console.log(error);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     });
//   } else {
//     return res.status(403).json({ error: "Forbidden" });
//   }
// };

// export default authenticateToken;