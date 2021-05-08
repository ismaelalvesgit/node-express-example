import catchAsync from "../utils/catchAsync";
import knex from "../db";
import { send } from "../utils/mail";
import { multipleUpload, singleUpload, generateZIP, generatePDF, generateSpreadSheet, generateDOCX } from "../utils";

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
    generateZIP("./src/public/uploads/system", "./src/public/zip/", "folder", "teste").then((out)=>{
        res.setHeader('Content-Type', 'application/zip')
        res.setHeader('Content-disposition', 'attachment;filename=teste.zip')
        res.download(out);
    }).catch(next);
}); 

export const pdf = catchAsync(async (req, res, next) =>{
    generatePDF('bem-vindo', {nome: "Ismael Alves"}).then((out)=>{
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-disposition', 'attachment;filename=teste.pdf')
        res.download(out)
    }).catch(next)
}); 

export const spreadSheet = catchAsync(async (req, res, next) =>{
    const type = 'xlsx'
    generateSpreadSheet(
        'teste', 
        [
            {
                header: "Nome",
                key: "nome",
                width: 50
            }
        ],
        [{
            nome: "Ismael Alves"
        }],
        type
    ).then((out)=>{
        res.setHeader('Content-Type', `application/${type}`)
        res.setHeader('Content-disposition', `attachment;filename=teste.${type}`)
        res.download(out)
    }).catch(next)
}); 

export const docx = catchAsync(async (req, res, next) =>{
    generateDOCX("Ismael Alves").then((out)=>{
        res.setHeader('Content-Type', 'application/docx')
        res.setHeader('Content-disposition', 'attachment;filename=teste.docx')
        res.download(out)
    }).catch(next)
}); 
