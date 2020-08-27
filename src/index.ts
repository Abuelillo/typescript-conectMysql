import Server from './server/server';
import router from './router/router';
import MysQL from './mysql/mysql';

const server = Server.init(3000);
server.app.use( router );

//MysQL.instance;
//const mysql = new MysQL();

server.start( () => {
    console.log('Servidor corriendo en el puerto 3000');
});

