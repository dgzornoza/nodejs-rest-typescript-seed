import { app } from "../main";
import * as expressModule from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";

import * as fs from "fs";

const PATH: string = "/users";

module.exports = (express: expressModule.Express) => {


    express.get(PATH, (req: Request, res: Response, next?: NextFunction): any => {

        //res.send("respond with a resource" + app.prueba );
        //res.json(app.prueba);

        // let path: string = "../file.txt";
        let path: string = "c:/file.txt";

        fs.writeFileSync(path, "Hey there!");
        console.log("The file was saved!");
        // fs.readFile(path, 'utf8', function (err, data) {
        //     if (err) {
        //         return console.log(err);
        //     }
        //     var result = data.replace(/string to be replaced/g, 'replacement');

        //     fs.writeFile(path, result, 'utf8', function (err) {
        //         if (err) return console.log(err);
        //     });
        // });

        res.send("OK");
    });

};
