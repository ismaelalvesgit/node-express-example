import env from "../env";
import redisClient from "../redis";

/**
 * 
 * @param {import('ioredis').KeyType} key 
 * @param {import('ioredis').ValueType} value 
 * @param {number} timeExp 
 * @returns {Promise<"OK">}
 */
 export const setCache = (key, value, timeExp)=>{
    return redisClient.set(key, value, "EX", timeExp);
};

/**
 * 
 * @param {import('ioredis').KeyType} key 
 * @returns {object}
 */
export const getCache = async (key)=>{
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
};

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('ioredis').KeyType} key 
 * @returns {Promise<number>}
 */
 export const delCache = (req, key)=>{
    if(req){
        return redisClient.del(req.originalUrl || req.url);
    }  
    return redisClient.del(key);
};

/**
 * 
 * @param {string} prefix 
 * @returns {void}
 */
 export const delPrefixCache = async (prefix)=>{
    const keys = (await redisClient.keys(`${env.redis.prefix}${prefix}:*`)).map((key)=>{
        key.replace(env.redis.prefix, "");
    });
    return keys.length > 0 ? redisClient.del(keys) : null;
};