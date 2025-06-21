import Cosmetic from "../models/Cosmetic.js"

export default {
    async createProduct(productData){
        const newCosmetic = await Cosmetic.create(productData);
        return newCosmetic;
    },
    async getAll(){
        return await Cosmetic.find();
    },
    async getByID(id) {
        return await Cosmetic.findById(id);
    },
    async delete(productId, userId) {
        const product = await Cosmetic.findById(productId);
        console.log(product.owner)
        console.log(userId)
        if (product.owner != userId) {
            throw new Error("You are not owner");
        }  
        // await Cosmetic.findByIdAndDelete(product.id);
    },
}