
describe("Test forEach function", function(){
    it("test a single number value", function(){
        var aValue = 18;
        var expLen = 0;
        forEach(aValue, function(val){
            expect(val).toEqual(aValue);
            expLen++;
        });
        expect(expLen).toEqual(1);
    });

    it("test a single string value", function(){
        var aValue = "hello";
        var expLen = 0;
        forEach(aValue, function(val){
            expect(val).toEqual(aValue);
            expLen++;
        });
        expect(expLen).toEqual(1);
    });

    it("test a list of number", function(){
        var aList = [10, 20, 30];
        var eList = [];
        forEach(aList, function(val){
            eList.push(val);
        });
        expect(eList).toEqual(aList);
    });

    it("test a list of string", function(){
        var aList = ['abc', 'efg', 'hij'];
        var eList = [];
        forEach(aList, function(val){
            eList.push(val);
        });
        expect(eList).toEqual(aList);
    });

    it("test an object", function(){
        var aObject = {a:'apple', b: 12};
        var expObject = {};
        forEach(aObject, function(val, key){
            expObject[key] = val;
        });
        expect(expObject).toEqual(aObject);
    });
});
