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

function forEach(iterable, fn){
    if (typeof iterable === 'object'){
        var k, keys = Object.keys(iterable);
        for (var i = 0, ii = keys.length; i < ii; i++){
            k = keys[i];
            fn(iterable[k], k);
        }
    }
    else{
        fn(iterable);
    }
}

function copy(data){
    var cp;
    forEach(data, function(val, key){
        cp[key] = val;
    });
    return cp;
};

function dcopy(data){
};

var createAPI = (function(){
    var api = {};

    var apipub = {};

    apipub.add_api = function(api_name, api_domain){
        // keep going from here
        api_domain = api_domain || '';
        api[api_name] = new API(api_domain);
        apipub.get_api(api_name);
    }

    apipub.get_api(api_name) = function(api_name){
        return api[api_name];
    }

    return function(){
        return apipub;
    };

    var API = function(api_domain){
        this.domain = api_domain;
        this.methods = [];
    }

    API.prototype = {
        add_domain : function(api_domain){
            this.domain = api_domain;
        },
        create_request : function(method_name){
            return _add_method(method_name);
        },
        _add_method : function(method_name){
            return new APIMethod(method_name);
        },
    };

    var APIMethod = function(method_name){
        this.name = method_name;
    }

    APIMethod.prototype = {
        add_request_tags : function(tag_names){
            var this_obj = this;
            forEach(tag_names, function(tag_name){
                this_obj[tag_name] = _create_request_method(tag_name);
            });
        },
        _create_request_method : function(tag_name){
            var this_obj = this;
            return function(data){
                this_obj.send_tags[tag_name] = data;
                return this_obj;
            }
        },
        add_response_tags : function(tag_names){
            this.response_tags = copy(tag_names);
        },
        send : function(){
        },
        receive : function(receiveFn){
        }
    };

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

    /*
    function createfn(name, v){
        var apiobj = api[name];
        var url = apiobj.domain + apiobj[v.ref];
        var callback = v.callback;
        return function(){
            var furl = url + arguments[0];
            var fn = callback[length-1];
            $.get(furl, function(data){
                var params = get_params(callback.slice(0,callback.length-1));
                fn.apply(null, params);
            });
        }
    }

    */
/*
    return apipub;

    /*
    var dburl = 'https://api.douban.com',
	    searchapi = dburl + '/v2/movie/search?q=',
	    subjectapi = dburl + '/v2/movie/subject/';
        
    var searchOne = function(search_for, onsuccess){
        var url,
            res = [];
        url = searchapi + encodeURIComponent(search_for);
        $.get(url, function(data){
            onsuccess(data.subjects[0]);
        });
    };

    api.douban = {
        searchOne: searchOne
    };
    
    var client_id = 'd6bf2e431e38c5a2',
        ykurl = 'https://openapi.youku.com',
        yksearch = ykurl + '/v2/searches/video/by_keyword.json?client_id=' + client_id + '&category=%E7%94%B5%E5%BD%B1&timeless=4&keyword=';

    var yksearchOne = function(search_for, onsuccess){
        var url = yksearch + encodeURIComponent(search_for);
        $.get(url, function(data){
            onsuccess(data.videos[0]);
        });
    };

    api.youku = {
        searchOne: yksearchOne
    }

    api.apis = 2;
    api.searchOne = function(search_for, onsucess){
        var apis = 0;
        var callback = funtion(data){
            apis++;
            if (this.apis == apis)
        }
        api.douban.searchOne(search_for, function(data){
        });
    };
    */

})();
alert('douban.js');


