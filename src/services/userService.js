import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { generateAuthToken } from "../utils/userUtils.js";

export default {
    async register(userData){

        if (userData.password != userData.rePassword) {
            throw new Error("password not the same");
        }

        const user = await User.findOne({ username: userData.username });

        if (user) {
            throw new Error("User already exists");
        }

        const newUser = await User.create(userData);
        const token = await generateAuthToken(newUser);
        return token;
    },
    async login(username, password){
        const user  = await User.findOne({username});

        if (!user) {
            throw new Error('user not exist');
        }

        const isValid = await bcrypt.compare(password,user.password);
        if (!isValid) {
            throw new Error('invalid password');
        }

        const token = await generateAuthToken(user);
        return token;
    }
}
