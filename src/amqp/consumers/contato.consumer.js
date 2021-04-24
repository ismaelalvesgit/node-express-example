import elasticAgent from "../../apm";
import logger from "../../logger";
import { contatoService } from "../../services";
import { AmqpError, ValidadeSchema } from "../../utils/erro";
import parseMessage from "../middlewares/parse";
import validator from "../middlewares/validator";
import { createContatoShema } from "./schemas/contato";

export class ContactConsumer {

    _onConsume
    consumers = {
        example: "example-operations.create"
    }

    constructor(_onConsume){
        this._onConsume = _onConsume;
    }


    /**
     * 
     * @param {import('amqplib').Channel} channel 
     */
    assertQueue(channel){
        channel.consume(
            this.consumers.example,
            this._onConsume(
                channel,
                this._finisher.bind(this),
                parseMessage,
                validator(createContatoShema),
                this.contactCreate
            )
        );
    }

    /**
     * 
     * @param {import('amqplib').Channel} channel 
     * @param {*} message 
     * @param {*} err 
     */
    _finisher(
        channel,
        message,
        error
    ){
        if(error){
            let response;
            switch (error.constructor) {
                case ValidadeSchema: {
                    response = JSON.parse(error.message).map((i)=>{
                        return {
                            name: i.context.key,
                            message: i.message
                        };
                    });
                    break;
                }
                case AmqpError: {
                    if(error.code){
                        response = [{message: error.sqlMessage}];
                    }else{
                        response = error.message;
                    }
                    break;
                }
                default: 
                    if(elasticAgent){
                        elasticAgent.captureError(error);
                    }
                    break;
            }
            logger.error(`${message.fields.routingKey} ${JSON.stringify(response)}`);
        }
        channel.ack(message);
    }

    /**
     * 
     * @param {{
     *  fields: import('amqplib').MessageFields,
     *  properties: import('amqplib').MessageProperties,
     *  content: import('../../model/contato.model').Contato,
     * }} msg 
     */
    async contactCreate(msg){
        const data = msg.content;
        await contatoService.createContact(data).then((result)=>{
            if(!result.length){
                throw new AmqpError("Fallha ao criar contato");
            }
        }).catch((e)=> {
            throw new AmqpError(e);
        });
    }
}