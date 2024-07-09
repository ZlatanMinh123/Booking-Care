import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    try {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phonenumber: data.phonenumber,
            gender: data.gender === "1" ? true : false,
            roleId: data.roleId,
        });
        return "ok! create a new user succeed!";
    } catch (e) {
        throw e;
    }
};

let hashUserPassword = async (password) => {
    try {
        let hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (e) {
        throw e;
    }
};

module.exports = {
    createNewUser: createNewUser,
};
