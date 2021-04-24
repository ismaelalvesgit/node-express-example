import {
    connect,
} from "amqplib";
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
const getChannel = async ()=>{
    const conn = await _getConnection();
    return conn.createChannel();
};

/**
 * 
 * @returns {Promise<import('amqplib').ConfirmChannel>}
 */
const getConfirmChannel = async ()=>{
    const conn = await _getConnection();
    return conn.createConfirmChannel();
};

export {
    getChannel,
    getConfirmChannel
};