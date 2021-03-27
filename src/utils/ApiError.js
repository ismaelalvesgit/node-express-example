export default class ApiError extends Error {
    constructor(statusCode, message, isObject = false, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.isObject = isObject;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
