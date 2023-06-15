import 'reflect-metadata';
import app from './app'
import http from "http";
import connection from "./database/connection";

const server = http.createServer(app);
const port = process.env.PORT || '3009';
const onError = (error: any) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr?.port;
    console.log('Listening on ' + bind);
}
const startApp = async (): Promise<void> => {
    try{
        await connection.sync()
    }catch (err){
        console.error(err);
        //process.exit(1);
    }
}
void startApp();

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);