import Cosmetic from "../models/Cosmetic.js"

export default {
    async createProduct(productData){
        const newCosmetic = await Cosmetic.create(productData);
        return newCosmetic;
    },
    async getAll(){
        return await Cosmetic.find();
    }
}