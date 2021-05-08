import express from "express";
const router = express.Router();
import { docx, download, pdf, sendEmail, spreadSheet, status, upload } from "../controllers/system.controller";
import { emailShema, uploadShema } from "../validations/system";
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

/**
 * POST - /system/upload
 * */    
router.route("/upload")
    .post(verify(uploadShema), upload);

/**
 * GET - /system/download
 * */    
router.route("/download")
.get(download);

/**
 * GET - /system/pdf
 * */    
router.route("/pdf")
.get(pdf);

/**
 * GET - /system/spreadSheet
 * */    
router.route("/spreadSheet")
.get(spreadSheet);

/**
 * GET - /system/docx
 * */    
router.route("/docx")
.get(docx);

export default router;