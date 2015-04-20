
describe("Test forEach function", function(){
    beforeAll(function(){
        this.aNum = 15;
        this.aStr = 'apple';
        this.aObj = {a: 15, b: 'banana'};
        this.aListOfNum = [3, 32, 0.5, 999];
        this.aListOfStr = ['apple', 'banana', 'orange'];
        this.aListOfObj = [{a: 12, b: 'dog'}, {c: 0.9, d: 'calendar'}];
        this.aListofNumAndStrAndObj = ['superman', 7, 98, 'spider', {a: 'monkey', b: 67}];
        this.empty = {};
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

    it('test empty object', function(){
        var aEmpty = {};
        forEach(this.empty, function(val, key){
            aEmpty[key] = val;
        });
        expect(aEmpty).toEqual(this.empty);
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
*/

describe('test createAPI()', function(){
    beforeAll(function(){
        this.domain = 'http://domainapi.com';
        this.rq1 = '/{value}';
        this.rq2 = '/{value}/sub_domain';
        this.rq3 = '?{k1, k2}';
        this.rq4 = '/{value}?{k1, k2}';
        this.rq5 = '/{value}/sub_domain?{k1, k2}';

        this.value = 'testvalaue';
        this.k1 = 'k1';
        this.k2 = 'k2';
        this.v1 = 'testvalue1';
        this.v2 = 'testvalue2';
            
        this.erq1 = this.domain + '/' + this.value;
        this.erq2 = this.erq1 + '/sub_domain';
        var query = '?' + this.k1 + '=' + this.v1 + '&' + this.k2 + '=' + this.v2;
        this.erq3 = this.domain + query;
        this.erq4 = this.erq1 + query;
        this.erq5 = this.erq2  + query;
    });

    beforeEach(function(){
        var api = createAPI().addAPI('testapi');
        api.addDomain(this.domain);
        this.request = api.createRequest('testrequest');
    });

    it('test rq1', function(){
        this.request.addSubDomain(this.rq1);
        var act = this.request.value(this.value).build();
        expect(act).toEqual(this.erq1);
    });

    it('test rq2', function(){
        this.request.addSubDomain(this.rq2);
        var act = this.request.value(this.value).build();
        expect(act).toEqual(this.erq2);
    });

    it('test rq3', function(){
        this.request.addSubDomain(this.rq3);
        var act = this.request.k1(this.v1).k2(this.v2).build();
        expect(act).toEqual(this.erq3);
    });

    it('test rq4', function(){
        this.request.addSubDomain(this.rq4);
        var act = this.request.value(this.value).k1(this.v1).k2(this.v2).build();
        expect(act).toEqual(this.erq4);
    });
    
    it('test rq5', function(){
        this.request.addSubDomain(this.rq5);
        var act = this.request.value(this.value).k1(this.v1).k2(this.v2).build();
        expect(act).toEqual(this.erq5);
    });

    it('test rq5 - createSerivce', function(){
        var service = createAPI().createService(this.domain + this.rq5);
        var act = service.start().value(this.value).k1(this.v1).k2(this.v2).build();
        expect(act).toEqual(this.erq5);
    });
});

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

describe('test flatten()', function(){
    beforeAll(function(){
        this.ar1 = [1, 'a', 10, 'apple'];
        this.ar2 = [[1, 'a'], 'a', 10, 'apple'];
        this.ar3 = [[[1, 'a'], 'b'], 'a', 10, 'apple'];

        this.ar4 = [1, 'a', [10, 'banana'], 'apple'];
        this.ar5 = [1, 'a', 10, ['apple','banana', [1, 'c']]];
        
        this.er2 = [1, 'a', 'a', 10, 'apple'];
        this.er3 = [1, 'a', 'b', 'a', 10, 'apple'];
        this.er4 = [1, 'a', 10, 'banana', 'apple'];
        this.er5 = [1, 'a', 10, 'apple', 'banana', 1, 'c'];
    });

    it('test ar1', function(){
        expect(flatten(this.ar1)).toEqual(this.ar1);
    });

    it('test ar2', function(){
        expect(flatten(this.ar2)).toEqual(this.er2);
    });

    it('test ar3', function(){
        expect(flatten(this.ar3)).toEqual(this.er3);
    });

    it('test ar4', function(){
        expect(flatten(this.ar4)).toEqual(this.er4);
    });

    it('test ar5', function(){
        expect(flatten(this.ar5)).toEqual(this.er5);
    });
});

describe('test copy_ex()', function(){
    beforeAll(function(){
        this.t1 = {
            k1 : 'v1',
            k2 : 'v2',
            k3 : {
                k31 : 'v31',
                k32 : 'v32'
            },
            k4 : [
                {k41 : 'v41', k42 : 'v42'},
                {k41 : 'v41-1', k42 : 'v42-2'}
            ]
        }

        this.e1 = {
            k1 : 'v1',
            k2 : 'v32',
            k3 : ['v42', 'v42-2']
        }
    });

    it('test t1', function(){
        expect(copy_ex(this.t1, {k1:'k1',k2:'k3.k32',k3:'@k4.k42'})).toEqual(this.e1);
    });
});
