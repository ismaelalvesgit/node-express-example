import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import hidePoweredBy from 'hide-powered-by'
import hsts from 'hsts'
import xssFilter from 'x-xss-protection'
import morgan from 'morgan'
import logger from './logger'
import uuidMiddleware from './middleware/uuidMiddleware'
import swagger from 'swagger-ui-express'
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./doc/swagger.yml')
import systemRouter from './routes/system.routes'
import contatoRouter from './routes/contatos.routes'
import env from './env'

/** Instances */
dotenv.config()
const app = express();

/** Middlewares */
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(helmet())
app.use(hsts({
    maxAge: 31536000,
    includeSubDomains: true, 
    preload: true
}))
app.use(xssFilter())
app.use(hidePoweredBy())
app.use(uuidMiddleware)

/** Logger */
morgan.token('id', (req)=>{
    return req.id
});
morgan.token('date', function() {
    return new Date().toLocaleString('pt-BR', {
        timeZone: env.timezone
    });
});
morgan.token('body', (req) => JSON.stringify(req.body));

if(env.env !== "test"){
    app.use(morgan(':id :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :body ":referrer" ":user-agent"', {
        stream: logger.stream
    }))
}

/** Routers */
app.get('/', (req, res)=>{
    res.json("API ON")
})
app.use('/api-doc', swagger.serve, swagger.setup(swaggerDocument))
app.use('/system', systemRouter)
app.use('/contato', contatoRouter)

export default app