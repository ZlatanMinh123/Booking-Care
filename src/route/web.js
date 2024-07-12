import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router(); // Khởi tạo Router

let initWebRouter = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/crud", homeController.getCRUD);

    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayGetCRUD);
    router.get("/edit-crud", homeController.getEditCRUD);

    router.post("/put-crud", homeController.putCRUD);
    // Khi ta bấm vào thẻ a => ta đang gửi 1 y/c get đến server => do đó dùng method get
    // ở đây
    router.get("/delete-crud", homeController.deleteCRUD);

    return app.use("/", router);
};

module.exports = initWebRouter;
