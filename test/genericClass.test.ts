import { Importer } from '../src/analyze';
import { ParameterizableClass, TypeParameter } from '../src/lib/famix/src/model/famix';

const importer = new Importer();

const fmxRep = importer.famixRepFromSource("genericClass", 
    'class MyClass<T> {}\n\
');

describe('Tests for generic class', () => {

    it("should parse generics", () => {
        expect(fmxRep).toBeTruthy();
    });

    it("should contain one generic class", () => {
        expect(fmxRep._getAllEntitiesWithType("ParameterizableClass").size).toBe(1);
    });

    it("should contain a generic class MyClass", () => {
        const listOfNames = Array.from(fmxRep._getAllEntitiesWithType("ParameterizableClass")).map(e => (e as ParameterizableClass).getName());
        expect(listOfNames).toContain("MyClass");
    });

    it("should contain a generic class MyClass with a type parameter T", () => {
        const pList = Array.from(fmxRep._getAllEntitiesWithType("ParameterizableClass") as Set<ParameterizableClass>);
        expect(pList).toBeTruthy();
        const MyClass = pList.find(p => p.getName() === "MyClass");
        expect(MyClass).toBeTruthy();
        expect(MyClass?.getTypeParameters().size).toBe(1);
        if (MyClass) {
            expect((Array.from(MyClass.getTypeParameters())[0] as TypeParameter).getName()).toBe("T");
            expect((Array.from(MyClass.getTypeParameters())[0] as TypeParameter).getParentGeneric()).toBe(MyClass);
        }
    });

    const theClass = fmxRep._getFamixClass("MyClass");
    it ("should not be an abstract class", () => {
        expect(theClass).toBeTruthy();
        if (theClass) expect(theClass.getIsAbstract()).toBe(false);
    });
});
