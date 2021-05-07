class CustomError extends Error{
    constructor(statusCode, message, ){
        super(message || statusCode);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ApiError extends CustomError {
    constructor(statusCode, message){
        super(statusCode, message);
    }
}

export class AmqpError extends CustomError {
    constructor(message){
        super(null, message);
    }
}

export class EmailError extends CustomError {
    constructor(message){
        super(null, message);
    }
}

export class UploadError extends CustomError {
    constructor(message){
        super(null, message);
    }
}

export class ValidadeSchema extends CustomError{
    constructor(statusCode, message){
        super(statusCode, JSON.stringify(message));
    }
}