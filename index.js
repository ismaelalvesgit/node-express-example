import env from './src/env';
import { server, app } from './src/app';
import errorHandler from './src/middleware/errorMiddleware';
import logger from './src/logger';
import { startCollection } from './src/utils/metric';
import { connect } from './src/amqp';

function run(){
    if(env.server.active){
        server.listen(env.server.port, ()=>{
            app.use(errorHandler)
            import('./src/socketClient')
            import('./src/job')
            startCollection()
            logger.info(`Server on http://localhost:${env.server.port}`)
        })
    }

    if(env.amqp.active){
        connect()
    }
}

run();