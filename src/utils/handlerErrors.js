
export class CustomtError extends Error {

    constructor(message) {
        super(message);
        this.name = 'ValidationRequestError';
        Error.captureStackTrace(this, this.constructor);
    };

}


export class ValidationRequestError extends CustomtError {

    constructor(message) {
        super(message);
        this.name = 'ValidationRequestError';
        // this.stack = ''
    };

}

export class ValidationInputError extends CustomtError {

    constructor(message) {
        super(message);
        this.name = 'ValidationInputError';       
    };

}