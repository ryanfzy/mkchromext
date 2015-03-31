
describe("Test forEach function", function(){
    beforeAll(function(){
        this.aNum = 15;
        this.aStr = 'apple';
        this.aObj = {a: 15, b: 'banana'};
        this.aListOfNum = [3, 32, 0.5, 999];
        this.aListOfStr = ['apple', 'banana', 'orange'];
        this.aListOfObj = [{a: 12, b: 'dog'}, {c: 0.9, d: 'calendar'}];
        this.aListofNumAndStrAndObj = ['superman', 7, 98, 'spider', {a: 'monkey', b: 67}];
    });

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

/*
describe('test copy function', function(){
    it('test a number', function(){
        var eNum = 123;
        var aNum = copy(eNum);
        expect(aNum).toEqual(eNum);
    });

    it('test a string', function(){
        var eStr = 'abc';
        var aStr = copy(eStr);
        expect(aStr).toEqual(eStr);
    });

    it('test a list of number', function(){
        var eList = [1, 2, 3];
        var aList = copy(eList);
        expect(aList).toEqual(eList);
    });

    it('test a list of string', function(){
        var eList = ['a', 'ab', 'abc'];
        var aList = copy(aList);
        expect(aList).toEqual(eList);
    });

    it('test a object', function(){
        var eObj = {a: 'apple', b: 10};
        var aObj = copy(eObj);
        expect(aObj).toEqual(eObj);
    });
});

describe('test createAPI()', function(){
    it('test url create by api', function(){
        var eRes = 'https://api.douban.com/v2/movie/search?q=matrix&tag=action&start=1&count=2';
        var apis = createAPI();
        var api = apis.add_api('douban');
        api.add_domain('https://api.douban.com/v2/');
        var search = api.create_request('search');
        search.add_sub_domain('movie/search');
        search.add_request_tags(['q', 'tag', 'start', 'count']);
        search.add_response_tags(['count', 'start', 'total', 'subjects', 'title']);
        var aRes = search.q('matrix').tag('action').start('1').count('2').print();
        expect(aRes).toEqual(eRes);
    });
});
*/

describe('test startsWith()', function(){
    beforeAll(function(){
        this.str = 'apples'
    });

    it('test 1 letter', function(){
        expect(startsWith(this.str, 'a')).toBe(true);
    });

    it('test more than 1 letters', function(){
        expect(startsWith(this.str, 'apple')).toBe(true);
    });

    it('test sames 2 words', function(){
        expect(startsWith(this.str, 'apples')).toBe(true);
    });

    it('test 1 letter negative', function(){
        expect(startsWith(this.str, 'b')).toBe(false);
    });
});

describe('test endsWith()', function(){
    beforeAll(function(){
        this.str = 'apples';
    });

    it('test 1 letter', function(){
        expect(endsWith(this.str, 's')).toBe(true);
    });
    
    it('test more than 1 letter', function(){
        expect(endsWith(this.str, 'pples')).toBe(true);
    });

    it('test same 2 words', function(){
        expect(endsWith(this.str, 'apples')).toBe(true);
    });

    it('test 1 letter negative', function(){
        expect(endsWith(this.str, 'e')).toBe(false);
    });
});

describe('test trim_ex()', function(){
    it('test trim "{" and "}"', function(){
        var str = '{good}';
        expect(trim_ex(str, ['{','}'])).toEqual('good');
    });
});
