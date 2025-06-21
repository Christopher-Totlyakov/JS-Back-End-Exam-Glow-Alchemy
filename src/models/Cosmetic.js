import { Schema, model, Types } from "mongoose";

const cosmeticSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long'],
    },
    skin: {
        type: String,
        required: [true, 'Skin is required'],
        minlength: [10, 'Skin must be at least 10 characters long'],
        maxlength: [100, 'Skin must be at most 100 characters long'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [20, 'Description must be at least 20 characters long'],
        maxlength: [200, 'Description must be at most 200 characters long'],
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients are required'],
        minlength: [2, 'Ingredients must be at least 2 characters long'],
        maxlength: [50, 'Ingredients must be at most 50 characters long'],
    },
    benefits: {
        type: String,
        required: [true, 'Benefits are required'],
        minlength: [10, 'Benefits must be at least 10 characters long'],
        maxlength: [100, 'Benefits must be at most 100 characters long'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0.01, 'Price must be a positive number'],
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
        validate: {
            validator: function (value) {
                return /^https?:\/\//i.test(value);
            },
            message: 'Image URL must start with http:// or https://'
        }
    },
    recommendList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Cosmetic = model('Cosmetic', cosmeticSchema);

export default Cosmetic;