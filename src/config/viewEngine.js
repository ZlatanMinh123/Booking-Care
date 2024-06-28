import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); // dùng để cho biết phía client có thể
    // truy cập vào file public
    app.set("view engine", "ejs"); // giúp gõ đc các câu lệnh logic trong file html
    app.set("view", "./src/views");
};

module.exports = configViewEngine;
