import db from "../models/index"; // import biến db từ file index.js
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); // tìm tất cả dữ liệu trong bảng user
        return res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};

let getAboutPage = (req, res) => {
    return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("post CRUD from server");
};

// Hàm này được gọi khi truy cập router /get-crud => render ra bảng data trên trình duyệt
let displayGetCRUD = async (req, res) => {
    // Hàm getAllUser() lấy ra tất cả dữ liệu user trong db và gán = biến data
    let data = await CRUDService.getAllUser();
    return res.render("displayCRUD.ejs", {
        dataTable: data,
    });
};

let getEditCRUD = async (req, res) => {
    // Lấy ra id (id=1, id=2,...) và lưu vào biến userId
    let userId = req.query.id;
    // Đây là câu lệnh để kiểm tra xem có tìm thấy id hay k
    if (userId) {
        // Nếu tìm thấy, thì lấy thông tin user theo id và trả về cho client(trình duyệt)
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render("editCRUD.ejs", {
            user: userData,
        });
    } else {
        // Nếu không tìm thấy, trả về thông báo: không tìm thấy user
        return res.send("Users not found!");
    }
};

// Hàm putCRUD xử lý khi truy cập vào router /put-crud (khi ta nhấn nút Update)
let putCRUD = async (req, res) => {
    // Tạo biến data - chứa dữ liệu được gửi từ form
    let data = req.body;
    // Hứng kết quả từ hàm updateUserData
    let allUsers = await CRUDService.updateUserData(data);
    // Hiển thị bảng data user ra trình duyệt
    return res.render("displayCRUD.ejs", {
        // Tạo biến dataTable - chứa tất cả bản ghi của user trong db
        dataTable: allUsers,
    });
};

// Hàm deleteCRUD xử lý khi truy cập vào router /delete-crud (khi ta nhấn nút Delete)
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send("Delete User Successful");
    } else {
        return res.send("Not Found a User");
    }
};

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};
