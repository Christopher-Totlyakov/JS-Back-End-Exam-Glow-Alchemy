import { Router } from "express";
import homeController from "./controllers/homeController.js";
import userControler from "./controllers/userController.js";
import productController from "./controllers/productControler.js";

const routes = Router();

routes.use(homeController);
routes.use("/users", userControler);
routes.use("/products", productController);
routes.all('*url',(req, res) =>{
    res.render('404');
})

export default routes;