import 'reflect-metadata';
import app from './app'
import connection from "./database/connection";
import ErrorHandler from "./app/Errors/ErrorHandler";
const port = process.env.PORT || '3009';

const startApp = async (): Promise<void> => {
    try{
        await connection.sync()
        // Handle application errors
        ErrorHandler.init(app)

        //start application
        app.listen(port, ()=>{
            console.log("Server running on port - " + port)
        })
    }catch (err){
        console.error(err);
        process.exit(1);
    }
}
void startApp();
