import env  from "./env";
import { server }  from "./app";
import { Server } from "socket.io";
import logger from "./logger";

/** @type {import('socket.io').Server} */
let io;
if(env.server.active){
    io = new Server(server, {
        cors:{
            origin: "*",
        }
    });
    logger.info("Registered service SOCKET.IO is ON");
}else{
    logger.info("Not registered service SOCKET.IO");
}

export default io;