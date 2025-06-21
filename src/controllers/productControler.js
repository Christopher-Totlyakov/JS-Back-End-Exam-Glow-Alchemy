import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtils.js";
import productService from "../services/productService.js";


const productController = Router();

productController.get("/create", (req,res) =>{
    res.render('product/create');
});

productController.post("/create", async (req, res) => {
    
    let productData = req.body;
    productData.owner = req.user.id
    try {
        await productService.createProduct(productData)
    } catch (err) {
        res.render('product/create', { error: getErrorMessage(err), product: req.body });
    }

    res.render('product/create');

});

export default productController;