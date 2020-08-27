"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MysQL {
    constructor() {
        this.conectado = false;
        console.log('clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123T456@',
            database: 'node_db'
        });
        this.conectarDB();
    }
    ;
    //singelton
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    ;
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('error en query');
                console.log(err);
                return callback(err);
            }
            ;
            var count = 0;
            var i;
            for (i in results) {
                if (results.hasOwnProperty(i)) {
                    count++;
                }
            }
            if (count === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
            ;
        });
    }
    ;
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            ;
            this.conectado = true;
            console.log('Base de datos online');
        });
    }
    ;
}
exports.default = MysQL;
