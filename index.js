import app from './src/app'
import errorHandler from './src/middleware/errorMiddleware'
import env from './src/env'
import logger from './src/logger'

export function startup(){
    return app.listen(env.server.port, ()=>{
        app.use(errorHandler)
        logger.info(`http://localhost:${env.server.port}`)
    })
}

startup();