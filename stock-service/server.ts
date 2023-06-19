import 'reflect-metadata';
import app from './app'
import ErrorHandler from "./app/Errors/ErrorHandler";
const port = process.env.APP_PORT || '3002';

// Handle application errors
ErrorHandler.init(app)

//start application
app.listen(port, ()=>{
    console.log("Stock service is running "+port+" and ready for connection")
})
