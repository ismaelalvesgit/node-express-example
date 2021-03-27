import { findAll } from "../model/contato.model";

const find = async(params) =>{
    return findAll(params)
}

export {
    find
}