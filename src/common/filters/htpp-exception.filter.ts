import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

//ce filtre gere les erreurs http de nestjs
@Catch()
export class HttpExceptionFilter implements ExceptionFilter

{
    catch(exception: unknown, host: ArgumentsHost){
        // recupere la reponse http
        const reponse = host.switchToHttp().getResponse();

        // verifie si c est une erreur http connue
         if(exception instanceof HttpException){
            // recupere le code http de l erreur
            const status = exception.getStatus();
        

        // recupere le message de l erreur

        const message = exception.getResponse();

        //envoi une reponse au client si le message est un json long il envoi u simple message
         reponse.status(status).json({
            statusCode: status,
            message:
            typeof message === 'string'?message : (message as any).message,
        });

        return;
        }
    // pour une erreur inatendu on ne montre pas les detail techniique ex : 500
        reponse.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500, 
        message : 'une ereur interne est survenu'
    })
    }
}