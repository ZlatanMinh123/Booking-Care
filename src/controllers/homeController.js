import db from "../models/index"; // import biến db từ file index.js

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

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
};
