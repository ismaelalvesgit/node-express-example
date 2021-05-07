import catchAsync from "../utils/catchAsync";
import knex from "../db";
import { send } from "../utils/mail";
import { multipleUpload, singleUpload, generateZip } from "../utils";

export const status = catchAsync(async (req, res, next) =>{
    knex.raw("select 1+1 as result").then(() =>{
        res.json("OK");
    }).catch(next);
});

export const sendEmail = catchAsync(async (req, res, next) =>{
    const data = req.body;
    send(data.email, "Send Email By Teste", "bem-vindo", {nome: "Ismael Alves"})
    .then(()=>{
        res.json("OK");
    }).catch(next);
}); 

export const upload = catchAsync(async (req, res, next) =>{
    const files = req.files.file;
    if(Array.isArray(files)){
        multipleUpload(files, "multiple/", "teste").then((urls)=>{
            res.json(urls);
        }).catch(next);
    }else{
        singleUpload(files, "single/", "teste").then((url)=>{
            res.json([url]);
        }).catch(next);
    }
}); 

export const download = catchAsync(async (req, res, next) =>{
    generateZip("./src/public/uploads/system", "./src/public/uploads/zip/", "folder", "teste").then((out)=>{
        res.download(out);
    }).catch(next);
}); 
