import { Router } from "express";
import { sendEmail } from "../controllers/mail.controller.js";

const contactUsRouter = Router();

contactUsRouter.post("/", sendEmail);

export default contactUsRouter;
