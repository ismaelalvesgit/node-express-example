import fs from "fs";
import mv from "mv";
import archiver from "archiver";
import rimraf from "rimraf";
import shell from "shelljs";
import path from "path";
import ejs from "ejs";
import pdf from "html-pdf";
import excel from "exceljs";
import { Document, Packer, Paragraph, TextRun } from "docx";
import env from "../env";
import logger from "../logger";
import { UploadError } from "./erro";

/**
 * 
 * @param {string} folder 
 */
export const defaultFolder = (folder)=>{
    if (!fs.existsSync(folder)){
        shell.mkdir("-p", folder);
    }
};

/**
 * @param {string} path 
 */
export const deleteFolder = (path)=>{
    rimraf.sync(path);
};

/**
 * 
 * @param {string} url 
 */
export const deleteFile = (url)=>{
    const file  = url.split(env.system.files.uploadsUrl)[1];
    if(file != "system/default.png"){
        fs.unlinkSync(env.system.files.uploadsPath+file);
    }
};

/**
 * 
 * @param {string} pathOrigin 
 * @param {string} pathDestination 
 * @param {'file'|'folder'} type 
 * @param {string} fileName 
 * @returns {Promise<string>}
 */
export const generateZIP = async(pathOrigin, pathDestination, type, fileName = "target")=>{
    return new Promise((resolve, reject)=>{
        defaultFolder(pathDestination);
        const zip = archiver("zip", {
            zlib:{
                level: 9
            }
        });
        const output = fs.createWriteStream(pathDestination+fileName+".zip");
        output.on("close", function(){
            logger.debug(zip.pointer() + " total bytes");
        });
        zip.on("error", function(err){
            reject(err);
        });
        zip.on("finish", function(){
            resolve(path.join(__dirname, `../.${pathDestination}${fileName}.zip`));
        });
        zip.pipe(output);
        switch (type) {
            case "file":
                logger.debug(fs.createWriteStream(pathOrigin));
                // zip.append(fs.createWriteStream(pathOrigin), {name: fileName})
                break;
            case "folder": 
                zip.directory(pathOrigin, "files", {date: new Date()});
                break;
        }
        zip.finalize();
    });
};

/**
 * 
 * @param {string} extension 
 * @returns {string}
 */
export const fileExtension = (extension)=>{
    switch(extension){
        case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            extension = "xlsx";
            break;
        case "vnd.openxmlformats-officedocument.wordprocessingml.document":
            extension = "doc";
            break;
        case "vnd.ms-powerpoint":
            extension = "ppt";
            break;
        case "x-rar-compressed":
            extension = "rar";
            break;
        case "plain":
            extension = "log";
            break;
        case "octet-stream":
            extension = "pxd";
            break;
        case "svg+xml":
            extension = "svg";
            break;
        case "vnd.microsoft.icon":
            extension = "icon";
            break;    
    }
    return extension;
};

/**
 * 
 * @param {File} file 
 * @param {string} path 
 * @param {string} nameFile 
 * @returns {Promise<string}
 */
export const singleUpload = (file, path, nameFile)=>{
    return new Promise((resolve, reject)=>{
        this.defaultFolder(env.system.files.uploadsPath + path);
        const extension = this.fileExtension(file.type.split("/")[1]);
        const name = nameFile+"."+extension;
        const source = file.path;
        const dest = env.system.files.uploadsPath + path + name; 
        mv(source, dest, (err)=>{
            if(err){
                logger.debug(err);
                reject(new UploadError(err));
            }
            resolve(env.system.files.uploadsUrl + path + name);
        });
    });
};

/**
 * 
 * @param {Array<File>} files 
 * @param {string} path 
 * @param {string} nameFile 
 * @param {number} limit 
 * @returns {Promise<string}
 */
export const multipleUpload = (files, path, nameFile, limit)=>{
    return new Promise((resolve, reject)=>{
        this.defaultFolder(env.system.files.uploadsPath + path);
        limit = files.length === undefined ? 1 : files.length;
        if(limit > 4){
            limit = 4;
        }
        let urls = [];
        for (let i = 0; i < limit; i++) {
            let extension = "";
            let source = "";
            let name = "";
            const dest = env.system.files.uploadsPath + path + name;
            if(limit === 1 ){
                extension = this.fileExtension(files.type.split("/")[1]);
                source = files.path;
                name = nameFile +"."+extension;
            }else{
                extension = this.fileExtension(files[i].type.split("/")[1]);
                source = files[i].path;
                name = nameFile+ i +"."+extension;
            }
            mv(source, dest, (err)=>{
                if(err){
                    logger.debug(err);
                    reject(new UploadError(err));
                }
                urls.push(env.system.files.uploadsUrl + path + name);
                if(parseInt(limit) === urls.length){
                    resolve(urls);
                }
            });
        }
    });
};

/**
 * 
 * @param {string} template 
 * @param {object} data 
 * @param {string} fileName 
 * @returns {Promise<{file: import('html-pdf').FileInfo, path: string}>}
 */
export const generatePDF = (template, data, fileName = "teste")=>{
    return new Promise((resolve, reject)=>{
        const pathFile = path.join(__dirname, `../public/pdf/${fileName}.pdf`)
        this.defaultFolder(path.join(__dirname, `../public/pdf`));
        ejs.renderFile(path.join(__dirname, `../views/pdf/${template}.ejs`), data, (ejsErr, html)=>{
            pdf.create(html, {
                format: 'A4',
            }).toFile(pathFile, (err, file)=>{
                if(ejsErr || err){
                    reject(err)
                }
                resolve(pathFile)
            })
        })
    })
}

/**
 * 
 * @param {string} nameFile 
 * @param {Array<import('exceljs').Column>} columns 
 * @param {Array<Object>} rows 
 * @param {'xlsx' | 'csv'} type
 * @param {string} fileName
 * @returns {Promise<string>}
 *  
 */
export const generateSpreadSheet = (nameFile, columns, rows, type = 'xlsx', fileName = "teste")=>{
    return new Promise((resolve, reject)=>{
        const pathFile = path.join(__dirname, `../public/${type}/${fileName}.${type}`)
        this.defaultFolder(path.join(__dirname, `../public/${type}`));

        const workbook = new excel.Workbook();
        workbook.creator = "Ismael Alves"
        workbook.lastModifiedBy = "IS"
        workbook.created = new Date()

        const worksheet = workbook.addWorksheet(nameFile)
        worksheet.columns = columns
        worksheet.addRows(rows)

        switch (type) {
            case 'xlsx':
                workbook.xlsx.writeFile(pathFile).then(() => {
                    resolve(pathFile)
                }).catch(reject)
                break;
            case 'csv':
                workbook.csv.writeFile(pathFile).then(() => {
                    resolve(pathFile)
                }).catch(reject)
                break;
        
            default:
                throw new Error('Type SpreadSheet not implemented')
        }
    })
}

/**
 * 
 * @param {Object} data 
 * @param {string} fileName 
 * @returns {Promise<string>}
 */
export const generateDOCX = (data, fileName = "teste")=>{
    return new Promise((resolve, reject)=>{
        const pathFile = path.join(__dirname, `../public/docx/${fileName}.docx`)
        this.defaultFolder(path.join(__dirname, `../public/docx`));

        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun(data),
                                new TextRun({
                                    text: "Foo Bar",
                                    bold: true,
                                }),
                                new TextRun({
                                    text: "\tGithub is the best",
                                    bold: true,
                                }),
                            ],
                        }),
                    ],
                },
            ],
        });

        Packer.toBuffer(doc).then((buffer)=>{
            fs.writeFileSync(pathFile, buffer)
            resolve(pathFile)
        }).catch(reject)
    })
}