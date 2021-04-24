import { getChannel } from "../amqpClient";
import logger from "../logger";
import { ContactConsumer } from "./consumers/contato.consumer";
import onConsume from "./middlewares/onConsume";

const _connectConsumers = async ()=>{
    const channel = await getChannel();
    [
        new ContactConsumer(onConsume)
    ].forEach((consumer)=>{
        consumer.assertQueue(channel);
    });
};

export const connect = async ()=>{
    try {
        await _connectConsumers();
        logger.info("Registered service AMQP is ON");
    } catch (error) {
        logger.info("Not registered service AMQP");
    }
};