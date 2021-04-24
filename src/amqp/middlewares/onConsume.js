import logger from "../../logger";
import applyHandlers from "./handlers";

export default  (channel, finisher, ...msgHandlers)=>{
    return async (message)=>{
        let error = null;
        try {
            const handle = applyHandlers(msgHandlers);
            await handle(message);
        } catch (err) {
            error = err;
            logger.error({error, type: "consume_message_failed"});
        } finally {
            finisher(channel, message, error);
        }
    };
};