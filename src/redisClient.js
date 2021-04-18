import Redis from "ioredis";
import env from "./env";
import logger from "./logger";

/** @type {import('ioredis').Redis} */
let redisClient;
if(env.redis.host){
    redisClient = new Redis({
        host: env.redis.host,
        port: env.redis.port,
        keyPrefix: env.redis.prefix
    });
    logger.info("Registered service redis is ON");
}else{
    logger.info("Not registered service redis");
}

export default redisClient;