import { Importer } from '../src/analyze';
import { Function } from "../src/lib/famix/src/model/famix/function";

const importer = new Importer();

const fmxRep = importer.famixRepFromSource("functionsInMethod", 
    'class F {\n\
    m() {\n\
        function fct2() {\n\
            function fct3() {\n\
                return 0;\n\
            }\n\
        }\n\
    }\n\
}\n\
');

describe('Tests for functions in method', () => {
    
    const theMethod = fmxRep._getFamixMethod("m");
    const theFunction2 = fmxRep._getFamixFunction("fct2");
    const theFunction3 = fmxRep._getFamixFunction("fct3");

    it("should have one method 'm' with a function 'fct2'", () => {
        expect(theMethod).toBeTruthy();
        expect(theFunction2).toBeTruthy();
        expect(theMethod?.getFunctions().size).toBe(1);
        expect(Array.from(theMethod?.getFunctions() as Set<Function>)[0]).toBe(theFunction2);
    });

    it("should have one function 'fct2' with a function 'fct3'", () => {
        expect(theFunction2).toBeTruthy();
        expect(theFunction3).toBeTruthy();
        expect(theFunction2?.getFunctions().size).toBe(1);
        expect(Array.from(theFunction2?.getFunctions() as Set<Function>)[0]).toBe(theFunction3);
    });

    it("should have one function 'fct3' with no function", () => {
        expect(theFunction3).toBeTruthy();
        expect(theFunction3?.getFunctions().size).toBe(0);
    });
});
