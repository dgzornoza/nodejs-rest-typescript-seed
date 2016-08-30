/** @Brief Class for define help methods */
export namespace Helpers {
    "use strict";

    /** @brief Help function for split an array/string into parts of a specified size
     * @param input Array elements or string to split into parts
     * @param chunks Size of parts that will separate the array/string
     * @return Matrix containing splitted input array, null if not able to perform.
     */
    export function splitArray<T>(input: T[] | string, chunks: number = 1): any[] {

        // verify array type
        if (!Array.isArray(input) && !String.isString(input)) { return undefined; }

        // Loop for split result array
        let result: any[] = [];
        for (let i: number = 0; i < input.length; i += chunks) {
            result.push(input.slice(i, i + chunks));
        }

        return result;
    }


    export class String {

        /** @brief Method declaration to check whether an object is of type string
         * @param obj object to check
         * @return true if object is type of string, false otherwise
         */
        public static isString(obj: any): boolean {
            return typeof obj === "string" || obj instanceof String;
        }

        /** @brief Extension method for split a string into an array just as string.split(), but allowing the array to remove items
         * that match the string specified by the parameter 'removeItemString'
         * @param input string/RegEx to split.    
         * @param separator separator to create the array
         * @param removeItemString string to remove items in the array eg "" -> removes empty items
         * @param limit array size limit
         * @return array of strings splited
         */
        public static splitWithRemove(input: string | RegExp, separator: string | RegExp, removeItemString: string, limit?: number): string[] {
            if ("" === input) { return new Array(); }
            let items: any = (input as any).split(separator, limit);

            for (let i: number = 0; i < items.length; i++) {
                if (items[i] === removeItemString) {
                    items.splice(i, 1);
                    i--;
                }
            }

            return items;
        }

        /** Metodo extensor para asegurar que la cadena finalice con barra '/', usado para formar rutas
         * @param input string to ensure slash
         */
        public static ensureSlash(input: string): string {
            return input.replace(/\/?$/, "/");
        }
    }
}

