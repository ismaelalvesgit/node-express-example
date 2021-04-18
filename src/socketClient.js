import SocketIO from "socket.io";
import env  from "./env";
import { server }  from "./app";
import logger from "./logger";

/** @type {import('socket.io').Server} */
let io;
if(env.server.active){
    io = SocketIO(server, {
        origins: "*:*"
    });
    logger.info("Registered service socket is ON");
}else{
    logger.info("Not registered service socket");
}

export default io;