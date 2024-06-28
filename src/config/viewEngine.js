import express from "express";

let configViewEngine = (app) => {
    const path = require("path");
    app.use(express.static(path.join(__dirname, "../public")));
    // dùng để cho biết phía client có thể truy cập vào file public
    app.set("view engine", "ejs"); // giúp gõ đc các câu lệnh logic trong file html
    app.set("views", path.join(__dirname, "../views"));
};

module.exports = configViewEngine;
