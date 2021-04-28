import catchAsync from "../utils/catchAsync";
import knex from "../db";
import { send } from "../utils/mail";

export const status = catchAsync(async (req, res, next) =>{
    knex.raw("select 1+1 as result").then(() =>{
        res.json("OK");
    }).catch(next);
});

export const sendEmail = catchAsync(async (req, res, next) =>{
    const data = req.body
    send(data.email, "Send Email By Teste", "bem-vindo", {nome: "Ismael Alves"})
    .then(()=>{
        res.json("OK");
    }).catch(next)
}); 