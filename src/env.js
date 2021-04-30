import dotenv from "dotenv";
dotenv.config();

export default {
    env: process.env.NODE_ENV || "development",
    timezone: process.env.TIME_ZONE || "America/Fortaleza",
    security:{
        ssl: {
            cert: process.env.SSL_CERT,
            key: process.env.SSL_CERT,
        }
    },
    server:{
        active: process.env.SERVER_ACTIVE === "true",
        ssl: process.env.SERVER_SSL == "true",
        port: parseInt(process.env.SERVER_PORT || "3000"),
        bodyLimit: process.env.SERVER_BODY_LIMIT || "500kb"
    },
    db:{
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        debug: process.env.DB_DEBUG === "true"
    },
    amqp:{
        active: process.env.AMQP_ACTIVE === "true",
        protocol: process.env.AMQP_PROTOCOL,
        host: process.env.AMQP_HOSTNAME,
        port: parseInt(process.env.AMQP_PORT || "5672"),
        user: process.env.AMQP_USERNAME,
        password: process.env.AMQP_PASSWORD,
        vhost: process.env.AMQP_VHOST,
    },
    redis:{
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "6379"),
        prefix: process.env.REDIS_PREFIX || "example" 
    },
    apm:{
        serverUrl: process.env.APM_SERVER_URL,
        serviceName: process.env.APM_SERVICE_NAME,
        apiKey: process.env.APM_API_KEY,
        secretToken: process.env.APM_SECRET_TOKEN,
    },
    email:{
        type: process.env.EMAIL_TYPE || "OAuth2",
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: process.env.EMAIL_PORT ||  465,
        secure: process.env.EMAIL_SECURE === "true",
        notificator: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
        OAuth2:{
          clientId:  process.env.EMAIL_OAUTH2_CLIENTID,
          clientSecret: process.env.EMAIL_OAUTH2_CLIENTSECRET,
          refreshToken: process.env.EMAIL_OAUTH2_REFRESHTOKEN,
          redirectUri: process.env.EMAIL_OAUTH2_REDIRECT_URI || "https://developers.google.com/oauthplayground"
        },
    }
};