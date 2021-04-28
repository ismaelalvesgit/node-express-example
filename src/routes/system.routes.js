import express from "express";
const router = express.Router();
import { sendEmail, status } from "../controllers/system.controller";
import { emailShema } from "../validations/system";
import verify from "../middleware/verifiyMiddleware";

/**
 * GET - /system/healthcheck
 * */    
router.route("/healthcheck")
    .get(status);

/**
 * GET - /system/mail
 * */    
router.route("/mail")
    .post(verify(emailShema), sendEmail);

export default router;