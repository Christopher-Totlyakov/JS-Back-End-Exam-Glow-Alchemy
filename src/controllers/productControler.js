import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtils.js";
import productService from "../services/productService.js";
import { isAuth, isGuest } from "../middlewares/authMiddlewares.js";



const productController = Router();

productController.get("/create", isAuth, (req,res) =>{
    res.render('product/create');
});

productController.post("/create", isAuth, async (req, res) => {
    
    let productData = req.body;
    productData.owner = req.user.id
    try {
        await productService.createProduct(productData)
        res.redirect('/products');
    } catch (err) {
        res.render('product/create', { error: getErrorMessage(err), product: req.body });
    }


});

productController.get("/",async (req, res) => {

    try {
        const products = await productService.getAll();
        res.render('product/catalog', { products });
    } catch (err) {
        res.render('product/catalog', { error: getErrorMessage(err), products } );

    }
});

productController.get("/:id/details", async (req, res) => {
    const productId = req.params.id;

    try {
        const productDetails = await productService.getByID(productId);
        const recommendCount = productDetails.recommendList.length;
        const isOwner = productDetails.owner == req.user?.id;
        const isAuthenticated = req.isAuthenticated;

        res.render('product/details', { productDetails, recommendCount, isOwner, isAuthenticated })
    } catch (err) {
        res.render('404', { error: getErrorMessage(err)});
    }
   
});

productController.get("/:id/delete", async (req, res) => {
    const productId = req.params.id;
    try {
        await productService.delete(productId, req.user.id);
        res.redirect("/products");
    } catch (err) {
        res.render("404", { error: getErrorMessage(err) } );
    }

});

productController.get("/:id/edit", async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.getByID(productId);

        if (product.owner != req.user?.id) {
            throw new Error('You are no owner');
        }
        res.render("product/edit", { product });
    } catch (err) {
        res.render("404", { error: getErrorMessage(err) });
    }

});
productController.post("/:id/edit", async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;
    const userId = req.user.id;

    try {
        await productService.edit(productId, updatedData, userId);
        res.redirect("/products");
    } catch (err) {
        res.render("404", { error: getErrorMessage(err) });
    }
});


export default productController;