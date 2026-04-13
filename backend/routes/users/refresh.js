import jwt from "jsonwebtoken"
import "dotenv/config"

const refresh = (req, res) => {
    try {
        if (req.headers.authorization) {
            const {email} = req.body
            const refresh_token = req.headers.authorization.split(" ")[1]
            const decoded_token = jwt.verify(refresh_token, process.env.JWT_SECRET)
            const access_token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "1h" })
            if (decoded_token) {
                res.send({ status: 200, message: "Access token generated successfully", access_token })
            } else {
                res.status(401).send({ message: "Token Unauthorized" })
            }
        }
        else {
            res.status(401).send({ message: "Token not provided" })
        }
    } catch (err) {
        res.status(401).send({ message: "Unauthorized" })
    }
}

export default refresh





