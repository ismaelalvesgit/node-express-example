import { initTracer } from "jaeger-client";
import env from "./env";
import logger from "./logger";

/** @type {import('jaeger-client').JaegerTracer} */
let jeagerClient;

if (env.jaeger.host) {
    jeagerClient = initTracer({
        serviceName: env.jaeger.serviceName,
        sampler: {
            host: env.jaeger.host,
            port: env.jaeger.port,
            param: env.jaeger.param,
            type: env.jaeger.type
        },
        reporter: {
            collectorEndpoint: env.jaeger.collectorEndpoint,
            logSpans: true,
        }
    }, {
        tags: {
            "express-example.version": "0.0.1"
        },
        logger: logger,
    });
}

export default jeagerClient;