"use server"

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from 'bcryptjs';

export const postUser = async (payload) => {

    //validation check required

    //check existing user 
    const isExist = await dbConnect("users").findOne({ email: payload.email });
    if (isExist) {
        return ({
            success: false,
            message: "user alreay existed"
        })
    };

    //create new user

    const hashPassword = await bcrypt.hash(payload.password, 10)

    const newUser = {
        ...payload,
        password: hashPassword,
        createdAt: new Date().toISOString(),
        role: "user",
    };

    const result = await dbConnect("users").insertOne(newUser);
    if (result.acknowledged) {
        return ({
            success: true,
            message: `user created with ${result.insertedId.toString()}`
        })
    } else {
        return ({
            success: false,
            message: "Something went wrong. Please try again!"
        })
    };

};