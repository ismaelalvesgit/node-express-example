import express from "express";
const router = express.Router();
import verify from "../middleware/verifiyMiddleware";
import { createContatoShema, updateContatoShema } from "../validations/contato";
import { findOne, find, create, update, del } from "../controllers/contato.controller";
import cachedMiddleware from "../middleware/cachedMiddleware";

/**
 * GET - /contato/:id
 * PUT - /contato/:id
 * DELETE - /contato/:id
 */
router.route("/:id")
    .get(findOne)
    .put(verify(updateContatoShema), update)
    .delete(del);

/**
 * GET - /contato
 * POST - /contato
 * */    
router.route("/")
    .get(cachedMiddleware(), find)
    .post(verify(createContatoShema), create);

export default router;