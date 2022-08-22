const Hapi = require("@hapi/hapi")


const config = require("./mongodb/db");
const routes  = require("./router/router");

const init = async () =>{
    const server = Hapi.server({
        port:4000,
        host:"localhost"
    });

    server.route(routes)
    await config.dbconnect()
    await server.start();
    console.log('Server running on %s', server.info.uri);

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init()