import path from "path";
import { I18n } from "i18n";
import logger from "../logger";
import elasticAgent from "../apm";

const i18n = new I18n();
i18n.configure({
    locales: [
        "pt-BR",
        "en-US",
    ],
    fallbacks: {
        pt: "pt-BR",
        en: "en-US",
    },
    defaultLocale: "pt-BR",
    directory: path.join(__dirname, "locales"),
    directoryPermissions: "755",
    register: global,
    autoReload: true,
    extension: ".json",
    logErrorFn: (msg)=>{
        if(elasticAgent){
            elasticAgent.captureError(msg);
        }
        logger.error(msg);
    }
});
export default i18n;