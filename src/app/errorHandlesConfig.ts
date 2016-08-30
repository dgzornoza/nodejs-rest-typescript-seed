
import * as expressModule from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";

/**
 * Class for configure error handle in midleware
 */
export class ErrorHandlesConfig {

    /** Function for initialize error handles in node express
     * @param express express module
     */
    public static initialize(express: expressModule.Express): void {

        // catch 404 and forward to error handler
        express.use((req: Request, res: Response, next?: NextFunction): any => {

            let err: any = new Error("Not Found") as any;
            err.status = 404;
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (express.get("env") === "development") {

            express.use((err: any, req: Request, res: Response, next: NextFunction): any => {
                res.status(err.status || 500);
                res.render("error", {
                    error: err,
                    message: err.message
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        express.use((err: any, req: Request, res: Response, next: NextFunction): any => {
            res.status(err.status || 500);
            res.render("error", {
                error: {},
                message: err.message
            });
        });
    }
}

