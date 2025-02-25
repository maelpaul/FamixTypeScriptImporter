import { Importer } from '../src/analyze';
import { Decorator } from '../src/lib/famix/src/model/famix/decorator';
import { Property } from '../src/lib/famix/src/model/famix/property';

const importer = new Importer();

const fmxRep = importer.famixRepFromSource("propertyWithDecorators",
    'import "reflect-metadata";\n\
\n\
const formatMetadataKey = Symbol("format");\n\
\n\
function format(formatString: string) {\n\
    return Reflect.metadata(formatMetadataKey, formatString);\n\
}\n\
\n\
function getFormat(target: any, propertyKey: string) {\n\
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);\n\
}\n\
\n\
function deco(bo: boolean) {\n\
    return function(target: any, propertyKey: string) { // no property descriptor in the signature of the property decorator\n\
        console.log(bo);\n\
    };\n\
}\n\
\n\
var h = format("Hello, %s");\n\
var o = deco(true);\n\
var t = deco;\n\
\n\
class Greeter {\n\
    @deco(true)\n\
    @h\n\
    @o\n\
    @t(false)\n\
    @format("Hello, %s")\n\
    greeting: string;\n\
    \n\
    constructor(message: string) {\n\
        this.greeting = message;\n\
    }\n\
    \n\
    greet() {\n\
        let formatString = getFormat(this, "greeting");\n\
        return formatString.replace("%s", this.greeting);\n\
    }\n\
}\n\
');

describe('Tests for property with decorators', () => {
    
    it("should contain one class", () => {
        expect(fmxRep._getAllEntitiesWithType("Class").size).toBe(1);
    });

    it("should contain a property 'greeting'", () => {
        expect(fmxRep._getAllEntitiesWithType("Property").size).toBe(1);
        const theProperty = (Array.from(fmxRep._getFamixClass("Greeter")?.getProperties() as Set<Property>) as Array<Property>).find((f) => f.getName() === "greeting");
        expect(theProperty).toBeTruthy();
    });

    it("should contain five decorators", () => {
        expect(fmxRep._getAllEntitiesWithType("Decorator").size).toBe(5);
    });

    const theProperty = (Array.from(fmxRep._getFamixClass("Greeter")?.getProperties() as Set<Property>) as Array<Property>).find((f) => f.getName() === "greeting");
    const d1 = (Array.from(fmxRep._getAllEntitiesWithType("Decorator")) as Array<Decorator>).find((d) => d.getName() === "@deco");
    const d2 = (Array.from(fmxRep._getAllEntitiesWithType("Decorator")) as Array<Decorator>).find((d) => d.getName() === "@h");
    const d3 = (Array.from(fmxRep._getAllEntitiesWithType("Decorator")) as Array<Decorator>).find((d) => d.getName() === "@o");
    const d4 = (Array.from(fmxRep._getAllEntitiesWithType("Decorator")) as Array<Decorator>).find((d) => d.getName() === "@t");
    const d5 = (Array.from(fmxRep._getAllEntitiesWithType("Decorator")) as Array<Decorator>).find((d) => d.getName() === "@format");

    it("should contain a property with five decorators", () => {
        expect(theProperty?.getDecorators().size).toBe(5);
        expect(d1?.getDecoratedEntity()).toBe(theProperty);
        expect(d2?.getDecoratedEntity()).toBe(theProperty);
        expect(d3?.getDecoratedEntity()).toBe(theProperty);
        expect(d4?.getDecoratedEntity()).toBe(theProperty);
        expect(d5?.getDecoratedEntity()).toBe(theProperty);
    });
});
