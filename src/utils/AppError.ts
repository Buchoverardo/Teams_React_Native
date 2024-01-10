export class AppError {
    message: string

    constructor(message: string) {
        this.message = message;
    }
}

// essa classe serve pra mandar mensagem personalizada do erro corrente