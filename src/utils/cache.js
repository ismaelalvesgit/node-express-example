import env from "../env";
import redisClient from "../redisClient";

/**
 * 
 * @param {import('ioredis').KeyType} key 
 * @param {import('ioredis').ValueType} value 
 * @param {number} timeExp 
 * @returns {Promise<"OK">}
 */
const setCache = (key, value, timeExp)=>{
    return redisClient.set(key, value, "EX", timeExp)
}

/**
 * 
 * @param {import('ioredis').KeyType} key 
 * @returns {object}
 */
const getCache = async (key)=>{
    const data = await redisClient.get(key)
    return data ? JSON.parse(data) : null
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('ioredis').KeyType} key 
 * @returns {Promise<number>}
 */
const delCache = (req, key)=>{
    if(req){
        return redisClient.del(req.originalUrl || req.url)
    }  
    return redisClient.del(key)
}

/**
 * 
 * @param {string} prefix 
 * @returns {void}
 */
const delPrefixCache = async (prefix)=>{
    const keys = (await redisClient.keys(`${env.redis.prefix}${prefix}:*`)).map((key)=>{
        key.replace(env.redis.prefix, "")
    })
    return keys.length > 0 ? redisClient.del(keys) : null
}

export {
    setCache,
    getCache,
    delCache,
    delPrefixCache
}