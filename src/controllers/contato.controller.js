import { contatoService } from "../services";
import { AmqpError, BadRequest, NotFound } from "../utils/erro";
import catchAsync from "../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import * as socket from "../socket/services";
import { publish } from "../amqpClient";
import env from "../env";

export const findOne = catchAsync(async (req, res) =>{
    const where = {id: req.params.id};
    const [ data ] = await contatoService.findAllContact(where);
    if(!data){
        throw new NotFound({code: "Contact"});
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
            res.status(StatusCodes.CREATED).json(req.__("Contact.create"));
        }else{
            throw new BadRequest({code: "Contact"});
        }
    }).catch(next);
});

export const createByAmqp = catchAsync(async(req, res, next) =>{
    if(!env.amqp.active){
        return next(new AmqpError({code: "amqp"}));
    }

    const data = req.body;
    
    const result = await publish(
        "example-create",
        "operations-create",
        data
    );
    
    if(result){
        res.status(StatusCodes.CREATED).json(req.__("Contact.amqp"));
    }else{
        return next(new AmqpError({code: "amqp"}));
    }
});

export const update = catchAsync((req, res, next) =>{
    const data = req.body;
    const id = req.params.id;
    contatoService.updateContact({id}, data).then((result)=>{
        if(result != 1){
            throw new NotFound({code: "Contact"});
        }
        res.status(StatusCodes.OK).json(req.__("Contact.update"));
    }).catch(next);
});

export const del = catchAsync(async (req, res, next) =>{
    const id = req.params.id;
    contatoService.delContact({id}).then((result)=>{
        if(result != 1){
            throw new NotFound({code: "Contact"});
        }
        res.sendStatus(StatusCodes.NO_CONTENT);
    }).catch(next);
});