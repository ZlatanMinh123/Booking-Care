import express from "express";
import bodyParser from "body-parser"; // Đây là thư viện hỗ trợ chúng ta lấy đc
// các tham số phía client hỗ trợ, vd: param, query. Vd: /user?id=7
// Muốn lấy đc số 7 ra ta cần dùng đến thư viện này

import viewEngine from "./config/viewEngine";
import initWebRouter from "./route/web";
import connectDB from "./config/connectDB";
require("dotenv").config(); // dòng này giúp chạy đc dòng let port = process.env.PORT...

let app = express();

// config app

app.use(bodyParser.json()); // Khai báo body-parser để chuyển dữ liệu từ JSON sang JS object
app.use(bodyParser.urlencoded({ extended: true })); // Khai báo body-parser
// để chuyển dữ liệu từ form POST sang JSON

viewEngine(app); // config view engine
initWebRouter(app); // config router

connectDB(); // connect to database  // dòng này để kết nối đến database

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
