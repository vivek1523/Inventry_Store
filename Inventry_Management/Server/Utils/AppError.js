class createError extends Error{
    constructor(message,statusCode){
        super(message);

        this.statusCode = statusCode;
        this.status =`${statusCode}`.startsWith('4') ?"Failed": "error";

        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = createError;