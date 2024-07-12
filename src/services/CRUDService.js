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

// Hàm dùng để update thông tin user trong db
// Trả về tất cả bản ghi của user trong db
let updateUserData = async (data) => {
    try {
        // Tạo biến user - chứa thông tin của user data cần update trong db
        let user = await db.User.findOne({
            // id trong db <- id trên router trình duyệt
            where: { id: data.id },
        });
        // Nếu tồn tại biến user (có dữ liệu của bản ghi trong db) thì
        // update thông tin của user
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            // Lưu thông tin
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

//
let deleteUserById = async (userId) => {
    try {
        let user = await db.User.findOne({
            // id trong db <- id trên router trình duyệt
            where: { id: userId },
        });
        if (user) {
            await user.destroy();
        }
        return;
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
};
