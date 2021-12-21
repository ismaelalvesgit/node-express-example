import { opentracing } from 'jaeger-client';
import jeagerClient from '../jaeger';
import env from '../env';

/**
 * @param req {import('express').Request}

 * @param res {import('express').Response}
 * @param next {import('express').NextFunction}
 */
export default (req, res, next)=>{
    if(env.jaeger.host){
        const span = jeagerClient.startSpan(req.path);
        span.addTags({
            [opentracing.Tags.SPAN_KIND]: opentracing.Tags.SPAN_KIND_MESSAGING_PRODUCER,
            [opentracing.Tags.HTTP_METHOD]: req.method,
            [opentracing.Tags.HTTP_URL]: req.path
        });
        res.endResponse = res.end
        res.end = (chunk, encoding)=>{
            span.setTag(opentracing.Tags.HTTP_STATUS_CODE, res.statusCode);
            span.finish();
            res.end = res.endResponse;
            res.end(chunk, encoding)
        }
        return next();
    }else{
        return next();
    }
}