/* tslint:disable no-reference */
/// <reference path="../typings/index.d.ts" />
/// <reference path="../../typings/index.d.ts" />
/* tslint:enable no-reference */


export class Config {

    /** application name */
    public static APP_NAME: string = "<%= APP_NAME %>";
    /** Server port */
    public static SERVER_PORT: string = "<%= SERVER_PORT %>";
    /** Source app folder */
    public static SOURCE_FOLDER: string = "<%= SOURCE_FOLDER %>";

}
