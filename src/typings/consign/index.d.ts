// Typings for npm consign module
// author David González Zornoza
interface IConsignStatic {
    (options?: IOptions): IConsignStatic;
    include(entity: any): any;
    exclude(entity: any): any;
    then(entity: any): any;
    into(entity: any): any;
}

interface IOptions {
    cwd?: any;
    locale?: string,
    logger?: any,
    verbose?: boolean,
    extensions?: any[],
    loggingType?: string
}


declare var Consign: IConsignStatic;

declare module "consign" {
  export = Consign;
}