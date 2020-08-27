import  mysql = require('mysql');

export default class MysQL {
    private static _instance : MysQL;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor(){
        console.log('clase inicializada');

        this.cnn = mysql.createConnection({
            host:'localhost',
            user: 'node_user',
            password: '123T456@',
            database:'node_db'
        });

        this.conectarDB();
    };

    //singelton
    public static get instance(){
        return this._instance || (this._instance = new this());
    };

    static ejecutarQuery(query:string, callback:Function){

        this.instance.cnn.query(query,(err, results:Object, fields)=>{
            if (err) {
                console.log('error en query');
                console.log(err);
                return callback(err);
            };

            var count = 0;
            var i;

            for (i in results) {
                if (results.hasOwnProperty(i)) {
                    count++;
                }
            }

            if (count === 0) {
                callback('El registro solicitado no existe');  
            }else{
                callback(null,results);
            };            

        });
    };

    private conectarDB(){
        this.cnn.connect((err:mysql.MysqlError)=>{
            
            if(err){
                console.log(err.message);
                return;
            };
            this.conectado = true;
            console.log('Base de datos online');
            
        })
    };

}