import { Importer } from '../src/analyze';

const importer = new Importer();

const fmxRep = importer.famixRepFromSource("metrics", 
    'class ForMetrics {\n\
    public methodCyclomaticOne() {}\n\
    \n\
    public methodCyclomaticFour() {\n\
        // make higher cyclomatic complexity\n\
        for (let i = 0; i < 50; i++) { // 2\n\
            for (let j = 0; j < 50; j++) { // 3\n\
                if (i < 10) {} // 4\n\
            }\n\
        }\n\
    }\n\
}\n\
\n\
function functionCyclomaticOne() {}\n\
\n\
function functionCyclomaticFour() {\n\
    // make higher cyclomatic complexity\n\
    for (let i = 0; i < 50; i++) { // 2\n\
        for (let j = 0; j < 50; j++) { // 3\n\
            if (i < 10) {} // 4\n\
        }\n\
    }\n\
}\n\
');

describe('Metrics', () => {

    const jsonOutput = fmxRep.getJSON();
    const parsedModel = JSON.parse(jsonOutput);

    it("should calculate cyclomatic complexity", () => {
        let theMethod = parsedModel.filter(el => (el.FM3 === "FamixTypeScript.Method" && el.name === "methodCyclomaticOne"))[0];
        expect(theMethod).toBeTruthy();
        expect(theMethod.cyclomaticComplexity).toBe(1);
        theMethod = parsedModel.filter(el => (el.FM3 === "FamixTypeScript.Method" && el.name === "methodCyclomaticFour"))[0];
        expect(theMethod).toBeTruthy();
        expect(theMethod.cyclomaticComplexity).toBe(4);

        let theFunction = parsedModel.filter(el => (el.FM3 === "FamixTypeScript.Function" && el.name === "functionCyclomaticOne"))[0];
        expect(theFunction).toBeTruthy();
        expect(theFunction.cyclomaticComplexity).toBe(1);
        theFunction = parsedModel.filter(el => (el.FM3 === "FamixTypeScript.Function" && el.name === "functionCyclomaticFour"))[0];
        expect(theFunction).toBeTruthy();
        expect(theFunction.cyclomaticComplexity).toBe(4);
    });
});
