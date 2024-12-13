const { Router } = require("express");
const { sendEmail } = require("../controllers/mail.controller");

const contactUsRouter = Router();

contactUsRouter.post("/", sendEmail);

module.exports = contactUsRouter;
