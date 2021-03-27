import { contatoService } from '../services'
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync'
import { StatusCodes } from 'http-status-codes'

const get = catchAsync(async (req, res) =>{
    const [ data ] = await contatoService.find({id: req.params.id})
    if(!data){
        throw new ApiError(StatusCodes.NOT_FOUND, 'Contato not found');
    }
    res.json(data)
})

export {
    get
}