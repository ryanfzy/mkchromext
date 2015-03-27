function bool(val){
    if (typeof val === 'undefined'){
        return false;
    }
    else if (typeof val === 'object'){
        var length = Array.isArray(val) ? val.length : Object.keys(val).length;
        if (length === 0){
            return false;
        }
    }
    else if (typeof val === 'string'){
        if (val.length === 0 || val.search(/ +/) > -1){
            return false;
        }
    }
    else if (typeof val === 'number'){
        if (val <= 0){
            return false;
        }
    }
    return true;
}

function createBoolFn(val, truths){
    return function(val){
        if (truths.indexOf(val) > -1){
            return true;
        }
        return bool(val);
    };
}


// only object is iterable
// string, number, boolean are not iterables
function isIterable(obj){
    if (typeof obj === 'object'){
        return true;
    }
    else{
        return false;
    }
}

function forEach(obj, fn){
    if (isIterable(obj)){
        var k, keys = Object.keys(obj);
        for (var i = 0, ii = keys.length; i < ii; i++){
            k = keys[i];
            fn(obj[k], k);
        }
    }
    else{
        fn(obj);
    }
}

/*
// not working properly
function copy(data){
    var cp = [];
    forEach(data, function(val, key){
        cp[key] = val;
    });
    return cp;
};
*/

var createAPI = (function(){
    var api = {};

    var add_api = function(api_name){
        var newAPI = new API();
        api[api_name] = newAPI;
        return newAPI;
    }

    var get_api = function(api_name){
        return api[api_name];
    }

    var API = function(){
        this.domain = '';
        this.services = {};
    }

    API.prototype = {
        add_domain : function(api_domain){
            this.domain = api_domain;
        },
        create_request : function(service_name){
            var newService = new APIService(this.domain);
            this.services[service_name] = newService;
            return newService;
        },
        get_request : function(service_name){
            return this.services[service_name];
        }
    };

    var APIService = function(domain){
        this.response_body = {};
        this.request_body = {};
        this.domain = domain;
    }

    APIMethod.prototype = {
        add_sub_domain : function(sub_domain){
            //TODO: check if sub_domain cross over domain
            this.domain = this.domain + sub_domain;
        },
        add_request_tags : function(tag_names){
            //TODO: need to handle case when no tag name needed
            //  e.g. protocol://domain/sub_domain/value, where value has no tag name
            var this_obj = this;
            forEach(tag_names, function(tag_name){
                this_obj[tag_name] = this_obj._create_request_method(tag_name);
            });
        },
        _create_request_method : function(tag_name){
            var this_obj = this;
            return function(data){
                this_obj.request_body[tag_name] = data;
                return this_obj;
            }
        },
        add_response_tags : function(tag_names){
            var this_obj = this;
            forEach(tag_names, function(tag_name){
                this_obj.response_body[tag_name] = '';
            });
        },
        _build_request_url : function(){
            //TODO: need to handle 2 cases:
            //  1) protocol://domain/sub_domain?k1=v1&k2=v2&...
            //  2) protocol://domain/sub_domain/value
            var part = this.domain + '?';
            forEach(this.send_body, function(val, key){
                var sep = '&';
                if (part.charAt(part.length-1) == '?'){
                    sep = '';
                }
                part = part + sep + key + '=' + val;
            });
            return part;
        },
        print : function(){
            return this._build_request_url();
        },
        send : function(userReceiveFn){
            var url = this._build_request_url();
            var responseFn = this._create_responseFn(userReceiveFn);
            load_url(url, responseFn);
            //userReceiveFn(url);
            //load_url(url, userReceiveFn);
        },
        _create_responseFn : function(userReceiveFn){
            var this_obj = this;
            return function(data){
                this_obj._process_response(data);
                userRecieveFn(this_obj.resposne_body);   
            }
        },
        _process_response : function(raw_data){
            var raw_keys = Object.keys(raw_data);
            var ret_keys = Object.keys(this.response_body);
            var set_keys = this._find_same_keys(raw_keys, ret_keys);
            forEach(set_keys, function(key){
                this.response_body[key] = raw_data[key];
            });
        }
    };

    return function(){
        return {
            add_api : add_api,
            get_api : get_api
        }
    };

    function load_url(url, onsuccessFn){
        var http = new XMLHttpRequest();
        http.onreadystatechange = function(){
            if(http.readyState == 4 && http.status == 200){
                var jobj = JSON.parse(http.responseText);
                //onsuccessFn(http.responseText);
                onsuccessFn(jobj);
            }
        };
        http.open('GET', url, true);
        http.send();
    }

/*
    function dcopy(obj, exceptions){
        var newobj = {};
    
        if (obj instanceof Array){
            forEach(obj, function(v){
                newobj[v] = v;
            })
        }
        else if (typeof obj === 'object'){
            forEach(obj, function(v,k){
                if (exceptions && exceptions.indexOf(k) > -1){
                    return;
                }
                if (typeof v === 'object'){
                    newobj[k] = dcopy(v);
                }
                else {
                    newobj[k] = v;
                }
            });
        }
        return newobj;
    }
    */
})();

// use case 1
var apis = createAPI();
var api = apis.add_api('douban');
api.add_domain('https://api.douban.com/');
var search = api.create_request('search');
search.add_sub_domain('/v2/movie/search');
search.add_request_tags(['q','tag', 'start', 'count']);
search.add_response_tags(['count', 'start', 'total', 'subjects', 'title']);
search.q('matrix').start('1').count('2').send(function(response){
    document.write(response.title);
});

// use case 2
var subject = '/v2/movie/subject/{id}';
var celebrity = '/v2/movie/celebrity/{id}';
var search = '/v2/movie/search?{q,tag,start,count}';
var subjectRequest = api.create_request('subject', subject);
subjectRequest.id('1764795').send();
var celebrityRequest = api.create_request('celebrity', celebrity);
celebrityRequest('1764795').send();

