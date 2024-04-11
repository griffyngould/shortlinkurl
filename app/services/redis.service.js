import redisConfig from "../config/redis.config.js"

export const redisSetEx = async (key,value,ttl)=>{
    return await redisConfig.setex(key,ttl,value)
}

export const redisGet = async (key) =>{
    return await redisConfig.get(key)
}

