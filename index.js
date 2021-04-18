import env from './src/env';
import { server, app } from './src/app';
import errorHandler from './src/middleware/errorMiddleware';
import logger from './src/logger';
import('./src/socket')

function run(){
    if(env.server.active){
        server.listen(env.server.port, ()=>{
            app.use(errorHandler)
            logger.info(`Server on http://localhost:${env.server.port}`)
        })
    }
}

run();