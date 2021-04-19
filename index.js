import env from './src/env';
import { server, app } from './src/app';
import errorHandler from './src/middleware/errorMiddleware';
import logger from './src/logger';
import { startCollection } from './src/utils/metric';


function run(){
    if(env.server.active){
        server.listen(env.server.port, ()=>{
            app.use(errorHandler)
            import('./src/socket')
            import('./src/job')
            startCollection()
            logger.info(`Server on http://localhost:${env.server.port}`)
        })
    }
}

run();