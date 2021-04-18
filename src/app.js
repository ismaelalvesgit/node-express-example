import dotenv from "dotenv";
import express from "express";
import http from "http";
import https from "https";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import hidePoweredBy from "hide-powered-by";
import hsts from "hsts";
import xssFilter from "x-xss-protection";
import morgan from "morgan";
import swagger from "swagger-ui-express";
import YAML from "yamljs";
import { readFileSync } from "fs";
const swaggerDocument = YAML.load("./doc/swagger.yml");
import logger from "./logger";
import uuidMiddleware from "./middleware/uuidMiddleware";
import systemRouter from "./routes/system.routes";
import contatoRouter from "./routes/contatos.routes";
import env from "./env";

/** Instances */
dotenv.config();
const app = express();
const server = env.server.ssl ? https.createServer({
    cert: readFileSync(env.security.ssl.cert),
    key: readFileSync(env.security.ssl.key),
}, app) : http.createServer(app);

/** Middlewares */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(hsts({
    maxAge: 31536000,
    includeSubDomains: true, 
    preload: true
}));
app.use(xssFilter());
app.use(hidePoweredBy());
app.use(uuidMiddleware);

/** Engine View */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/** Assets */
app.use("/static", express.static("./src/public"));

/** Logger */
morgan.token("id", (req)=>{
    return req.id;
});
morgan.token("date", function() {
    return new Date().toLocaleString("pt-BR");
});
morgan.token("body", (req) => JSON.stringify(req.body));

if(env.env !== "test"){
    app.use(morgan(":id :remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] :body \":referrer\" \":user-agent\"", {
        stream: logger.stream
    }));
}

/** Routers */
app.get("/", (req, res)=>{
    res.render("index");
});
app.use("/api-doc", swagger.serve, swagger.setup(swaggerDocument));
app.use("/system", systemRouter);
app.use("/contato", contatoRouter);
app.get("*", (req, res)=>{
    res.render("index");
});

export { app, server };