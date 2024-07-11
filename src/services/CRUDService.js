import bcrypt from "bcryptjs";
import db from "../models/index";
import { where } from "sequelize";

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

// Hàm dùng để băm password
let hashUserPassword = async (password) => {
    try {
        let hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (e) {
        throw e;
    }
};

// Hàm dùng để lấy tất cả dữ liệu của user trong db
let getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            raw: true,
        });
        return users;
    } catch (e) {
        throw e;
    }
};

let getUserInfoById = async (userId) => {
    try {
        // Lấy ra dữ liệu của 1 bản ghi trong db và lưu vào biến user
        let user = await db.User.findOne({
            where: { id: userId },
            raw: true,
        });
        // Nếu tồn tại biến user (có dữ liệu của bản ghi trong db) thì trả về biến user
        if (user) {
            return user;
            // Nếu k có thỉ trả về 1 object rỗng
        } else {
            return {};
        }
    } catch (e) {
        throw e;
    }
};

let updateUserData = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id },
        });
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
        } else {
            throw new Error(`User with id ${data.id} not found`);
        }

        let allUsers = await db.User.findAll();
        return allUsers;
    } catch (e) {
        throw e;
    }
};

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
};
