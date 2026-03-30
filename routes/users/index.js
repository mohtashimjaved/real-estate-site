import express from "express"
import getUser from "./get";

const userRouter = express.Router()
userRouter.use("/", getUser);

export default userRouter;