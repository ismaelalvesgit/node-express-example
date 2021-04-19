import io from "../../socketClient";
import * as model from "../../model/contato.model";
const BASE = "contato";

/**
 * 
 * @param {number} id 
 */
const createContact = async (id)=>{
    if(id){
        const newContact = await model.findAllContact({id});
        io.emit(`new-${BASE}`, newContact);
    }
};

export {
    createContact
};