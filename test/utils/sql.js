import mysql from "mysql2";
import env from "../../src/env";

const execute = (sql)=> {
    return new Promise((resolve, reject)=>{
        const query = mysql.createConnection({
            host: env.db.host,
            user: env.db.user,
            password: env.db.password,
            port: env.db.port,
        });
    
        query.execute(sql, (err, results)=>{
            if(err){
                reject(err);
            }
            resolve(results);
        });
    });
};

export default execute;