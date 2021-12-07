import env from './src/env';
import { httpServer, app } from './src/app';
import errorHandler from './src/middleware/errorMiddleware';
import logger from './src/logger';
import { startCollection } from './src/utils/metric';
import { connect } from './src/amqp';

setImmediate(() =>{
    if(env.server.active){
        httpServer.listen(env.server.port, ()=>{
            app.use(errorHandler)
            import('./src/job')
            import('./src/socket')
            startCollection()
            logger.info(`Server on http://localhost:${env.server.port}`)
        })
    }

    if(env.amqp.active){
        connect()
    }
})