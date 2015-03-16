
describe("Test forEach function", function(){
    var alist = ['a', 'b', 'c'];
    var aobj = {a: 10, b: 20, c: 30};
    it("test list - should pass", function(){
        var actual;
        var fval = -1;
        forEach(alist, function(val, key){
            actual = alist[key];
            expect(val).toEqual(actual);
        });
    });
    it("test list - should fail", function(){
        var fval = -1;
        forEach(alist, function(val, key){
            expect(val).toEqual(fval);
        });
    });
});
