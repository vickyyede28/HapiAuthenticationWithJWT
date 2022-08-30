const Hapi = require("@hapi/hapi")
// const Inert = require('@hapi/inert');
// const Vision = require('@hapi/vision');


// Connect to the database
const config = require("./mongodb/db");
const ValidateJWT = require("./middleware/auth")
const routes  = require("./router/router");

const init = async () =>{
    const server = Hapi.server({
        port:4000,
        host:"localhost"
    });

    await server .register(require("hapi-auth-jwt2"));
    server.auth.strategy("auth","jwt",{
        key:"CrudOperationWithAuthenticationUsingJsonWebTokenInHapiJs",
        validate:ValidateJWT()
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