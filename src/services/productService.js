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
        
        if (product.owner != userId) {
            throw new Error("You are not owner");
        }  
        await Cosmetic.findByIdAndDelete(product.id);
    },
    async edit(productId, updatedData, userId) {
        const product = await Cosmetic.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        if (product.owner.toString() !== userId) {
            throw new Error("You are not the owner");
        }

        await Cosmetic.findByIdAndUpdate(productId, updatedData, { runValidators: true });
    }
    
}