import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Username must be at least 2 characters'],
        maxlength: [20, 'Username must be at most 20 characters'],
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        minlength: [10, 'Email must be at least 10 characters'],
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Password must be at least 4 characters'],
    },
});

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 10);
})

const User = model('User', userSchema);

export default User;