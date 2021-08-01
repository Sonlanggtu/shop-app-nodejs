class HttpException extends Error {
    public status: number;
    public message: string;

    constructor(status: number, massage: string){
        super(massage);
        this.message = massage;
        this.status = status;
    }

}

export default HttpException;