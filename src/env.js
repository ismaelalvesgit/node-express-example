import dotenv from 'dotenv'
dotenv.config()

export default {
    server:{
        port: process.env.SERVER_PORT || 3000
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        env: process.env.NODE_ENV || "development"
    }
}