import { contatoService } from "../services";
import { AmqpError, ApiError } from "../utils/erro";
import catchAsync from "../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import * as socket from "../socket/services";
import { publish } from "../amqpClient";

export const findOne = catchAsync(async (req, res) =>{
    const where = {id: req.params.id};
    const [ data ] = await contatoService.findAllContact(where);
    if(!data){
        throw new ApiError(StatusCodes.NOT_FOUND, "Contato não encontrado");
    }
    res.json(data);
});

export const find = catchAsync(async (req, res) =>{
    const where = req.query;
    const data = await contatoService.findAllContact(where);
    res.json(data);
});

export const create = catchAsync((req, res, next) =>{
    const data = req.body;
    contatoService.createContact(data).then(async(result)=>{
        if(result.length){
            socket.contatoService.createContact(result[0]);
            res.status(StatusCodes.CREATED).json(`Criado com sucesso ID ${result[0]}`);
        }else{
            throw new ApiError(StatusCodes.BAD_REQUEST, "Fallha ao criar contato");
        }
    }).catch(next);
});

export const createByAmqp = catchAsync(async(req, res, next) =>{
    const data = req.body;
    const result = await publish(
        "example-create",
        "operations-create",
        data
    );
    
    if(result){
        res.status(StatusCodes.CREATED).json("Publicado na Fila de execução");
    }else{
        next(new AmqpError("Falha ao publica na fila"));
    }
});

export const update = catchAsync((req, res, next) =>{
    const data = req.body;
    const id = req.params.id;
    contatoService.updateContact({id}, data).then((result)=>{
        if(result != 1){
            throw new ApiError(StatusCodes.NOT_FOUND, "Contato não encontrado");
        }
        res.status(StatusCodes.OK).json(`ID ${id} Atualizado com sucesso`);
    }).catch(next);
});

export const del = catchAsync(async (req, res, next) =>{
    const id = req.params.id;
    contatoService.delContact({id}).then((result)=>{
        if(result != 1){
            throw new ApiError(StatusCodes.NOT_FOUND, "Contato não encontrado");
        }
        res.sendStatus(StatusCodes.NO_CONTENT);
    }).catch(next);
});