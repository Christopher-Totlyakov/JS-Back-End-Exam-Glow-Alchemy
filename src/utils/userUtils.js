import jsonwebtoken from "jsonwebtoken"
import { JWT_SECRET } from "../config/index.js";
import util from 'util'

const jwtPromisSign = util.promisify(jsonwebtoken.sign);

export async function generateAuthToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
    }

    const token = await jwtPromisSign(payload, JWT_SECRET, { expiresIn: '2h' });

    return token;
}