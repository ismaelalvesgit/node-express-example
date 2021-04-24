import {
    connect,
} from "amqplib";
import messageBusType from "./enum/messageBusType";
import env from "./env";

/** @type {import('amqplib').Options.Connect} */
const config = {
    protocol: env.amqp.protocol,
    hostname: env.amqp.host,
    port: env.amqp.port,
    username: env.amqp.user,
    password: env.amqp.password,
    vhost: env.amqp.vhost,
};

/**
 * 
 * @returns {Promise<import('amqplib').Connection>}
 */
const _getConnection = async ()=>{
    return connect(config);
};

/**
 * 
 * @returns {Promise<import('amqplib').Channel>}
 */
export const getChannel = async ()=>{
    const conn = await _getConnection();
    return conn.createChannel();
};

/**
 * 
 * @returns {Promise<import('amqplib').ConfirmChannel>}
 */
export const getConfirmChannel = async ()=>{
    const conn = await _getConnection();
    return conn.createConfirmChannel();
};

/**
 * 
 * @param {*} content 
 * @returns {Buffer}
 */
const _contentToBuffer = (content)=>{
    switch (typeof content) {
        case "object":
            return Buffer.from(JSON.stringify(content));
        case "string":
            return Buffer.from(content, "utf-8");
        default:
            return Buffer.from("", "utf-8");
    }
};

/**
 * 
 * @param {string} type 
 * @returns {Promise<import('amqplib').Channel> | Promise<import('amqplib').ConfirmChannel>}
 */
const _getInstance = async (type)=>{
    let messageBus;
    switch (type) {
        case messageBusType.withConfirmation:
            messageBus = await getConfirmChannel();
            break;
        case messageBusType.noConfirmation:
        default:
            messageBus = await getChannel();
            break;
    }
    return messageBus;
};

/**
 * 
 * @param {string} router 
 * @param {string} routingKey 
 * @param {*} content 
 * @param {import('./enum/messageBusType')} typeChannel 
 * @param {import('amqplib').Options.Publish=} options
 * @param {(err:any, ok: import('amqplib').Replies.Empty) => void=} callback
 * @returns {boolean}
 */
export const publish = async (router, routingKey, content, typeChannel = messageBusType.noConfirmation, options, callback)=>{
    const cBuffer = _contentToBuffer(content);
    const msgBusInstance = await _getInstance(typeChannel);
    return msgBusInstance.publish(router, routingKey, cBuffer, options, callback);
};