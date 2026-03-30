import User from "../../model";

const createUser = async (req, res) => {
    try {
        const password = bcrypt.hashSync(req.body.password, 10);
        const user = await User.create({
            ...req.body,
            password
        })
        const data = user.toObject();
        delete data.password
        res.send({ status: 200, message: "User created successfully"});

    } catch (err) {
        res.status(500).send({ error: err });
    }
}
export default createUser;