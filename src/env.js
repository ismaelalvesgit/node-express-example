import dotenv from 'dotenv'
dotenv.config()

export default {
    env: process.env.NODE_ENV || "development",
    timezone: process.env.TIME_ZONE || "America/Fortaleza",
    server:{
        active: Boolean(process.env.SERVER_ACTIVE || 'true'),
        port: parseInt(process.env.SERVER_PORT || '3000'),
        bodyLimit: process.env.SERVER_BODY_LIMIT || '500kb'
    },
    db:{
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        debug: Boolean(process.env.DB_DEBUG || 'false')
    },
    amqp:{
        active: Boolean(process.env.AMQP_ACTIVE || 'false'),
        protocol: process.env.AMQP_PROTOCOL,
        host: process.env.AMQP_HOSTNAME,
        port: parseInt(process.env.AMQP_PORT || '5672'),
        user: process.env.AMQP_USERNAME,
        password: process.env.AMQP_PASSWORD,
        vhost: process.env.AMQP_VHOST,
    },
    redis:{
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
    },
    apm:{
        serverUrl: process.env.APM_SERVER_URL,
        serviceName: process.env.APM_SERVICE_NAME,
        apiKey: process.env.APM_API_KEY,
        secretToken: process.env.APM_SECRET_TOKEN,
    }
}