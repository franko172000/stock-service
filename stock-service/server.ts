import 'reflect-metadata';
import app from './app'
import ErrorHandler from "./app/Errors/ErrorHandler";
const port = process.env.PORT || '3002';

// Handle application errors
ErrorHandler.init(app)

//start application
app.listen(port, ()=>{
    console.log("Server running on port - " + port)
})