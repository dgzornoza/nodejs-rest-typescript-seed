import * as expressModule from "express";
import * as pathModule from "path";
import * as morganModule from "morgan";
import * as cookieParserModule from "cookie-parser";
import * as bodyParserModule from "body-parser";
import * as debugModule from "debug";
import * as httpModule from "http";

import { ErrorHandlesConfig } from "app/errorHandlesConfig";
import "helpers";


// var routes = require("./routes/index");
// var users = require("./routes/users");





// app.use("/", rotes);
// app.use("/users", users);




class ServerApp {

    /** Main express module */
    private _express: expressModule.Express;
    private _server: httpModule.Server;
    private _port: number;
    private _debug: debugModule.IDebug;

    /** Default constructor */
    constructor() {

        // create node express server app
        this._express = expressModule();

        // Configure and start server
        this._serverConfig();
        this._serverStart();

    }

    /** Property for get nodejs express module */
    public get Express(): expressModule.Express {
        return this._express;
    }

    /** Property for get nodejs debug module */
    public get Debug(): debugModule.IDebug {
        return this._debug;
    }



    /** Configure server midleware */
    private _serverConfig(): void {

        // add modules to midleware
        this._express.use(morganModule("dev"));
        this._express.use(bodyParserModule.json());
        this._express.use(bodyParserModule.urlencoded({ extended: false }));
        this._express.use(cookieParserModule());
        this._express.use(expressModule.static(pathModule.join(__dirname, "public")));


        // Configure routes


        // configure languages


        // last, configure handle errors
        ErrorHandlesConfig.initialize(this._express);

    }

    /** start server */
    private _serverStart(): void {


        // Get port from environment and store in Express.
        this._port = parseInt(process.env.PORT, 10) || 3000;
        this._express.set("port", this._port);

        // Create HTTP server.
        this._server = httpModule.createServer(this._express);

        // Listen on provided port, on all network interfaces.
        this._server.listen(this._port);
        this._server.on("error", this._onError);
        this._server.on("listening", this._onListening);

    }


    /**
     * Event listener for HTTP server "error" event
     */
    private _onError(error: NodeJS.ErrnoException): void {

        if (error.syscall !== "listen") {
            throw error;
        }

        let bind: string = typeof this._port === "string"
            ? "Pipe " + this._port
            : "Port " + this._port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    private _onListening(): void {
        let addr: any = this._server.address();
        let bind: string = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr.port;
        debug("Listening on " + bind);
    }

}



// create main app instance for export
export let app: ServerApp = new ServerApp();

