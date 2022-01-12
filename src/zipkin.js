import { Tracer, ExplicitContext, BatchRecorder, jsonEncoder } from "zipkin";
import { HttpLogger } from "zipkin-transport-http";
import { expressMiddleware } from "zipkin-instrumentation-express";
import env from "./env";

const tracer = new Tracer({
    ctxImpl: new ExplicitContext(),
    recorder: new BatchRecorder({
        logger: new HttpLogger({
            endpoint: `${env.zinpkin.host}/api/v2/spans`,
            jsonEncoder: jsonEncoder.JSON_V2,
        }),
    }),
    localServiceName: "example-service",
});

export default expressMiddleware({ tracer });