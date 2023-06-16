import connection from "../database/connection";
export default class TestSetup {
    static async initDb(){
        await connection.authenticate();
    }
    static async closeDb(){
        await connection.close();
    }
    static initApp(){
    }
}