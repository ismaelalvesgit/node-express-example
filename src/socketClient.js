import { server }  from "./app";
import { Server } from "socket.io";
import logger from "./logger";

/** @type {import('socket.io').Server} */
const io = new Server(server, {
    cors:{
        origin: "*",
    }
});

logger.info("Registered service SOCKET.IO is ON");

export default io;