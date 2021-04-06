import app from './src/app'
import errorHandler from './src/middleware/errorMiddleware'
import env from './src/env'
import logger from './src/logger'

function run(){
    if(env.server.active){
        app.listen(env.server.port, ()=>{
            app.use(errorHandler)
            logger.info(`Server on http://localhost:${env.server.port}`)
        })
    }
}

run();