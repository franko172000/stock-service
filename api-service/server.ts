import 'reflect-metadata';
import app from './app'
import connection from "./database/connection";
import ErrorHandler from "./app/Errors/ErrorHandler";
const port = process.env.APP_PORT || '3009';

const startApp = async (): Promise<void> => {
    try{
        await connection.sync()
        // Handle application errors
        ErrorHandler.init(app)

        //start application
        app.listen(port, ()=>{
            console.log("Api service is running at port "+port+" and ready for connection")
        })
    }catch (err){
        console.error(err);
        process.exit(1);
    }
}
void startApp();
