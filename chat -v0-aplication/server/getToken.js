import jwt from "jsonwebtoken";

const getToken = async (userId, res) => {
    const token = jwt.sign({ userId, }, process.env.JWT);

    return token
}
export { getToken };