import connection from "./test.db-config";

export default class TestSetup {
    static async initDb(){
        try{
            await connection.sync();
        }catch (err){
            console.log(err)
        }
    }
    static async closeDb(){
        await connection.close();
    }
    static initApp(){
    }
}