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

function reverse(str){
    var result = '';
    for (var i = str.length-1; i > -1; i--){
        result = result + str[i];
    }
    return result;
}

function startsWith(tstr, cstr, isCaseSensitive){
    if (!isCaseSensitive){
        tstr = tstr.toLowerCase();
        cstr = cstr.toLowerCase();
    }
    for (var i = 0, len = cstr.length; i < len; i++){
        if (tstr[i] != cstr[i]){
            return false;
        }
    }
    return true;
}

function endsWith(tstr, cstr, isCaseSensitive){
    var rtstr = reverse(tstr);
    var rcstr = reverse(cstr);
    return startsWith(rtstr, rcstr, isCaseSensitive);
}

function trim_ex(origin_str, tags){
    var trimed_str = origin_str.trim();
    var si, ei;
    var sb = false, eb = false;
    forEach(tags, function(tag){
        if (!sb){
            if (startsWith(trimed_str, tag)){
                si = tag.length;
                sb = true;
            }
        }
        if (!eb){
            if (endsWith(trimed_str, tag)){
                ei = trimed_str.length - tag.length;
                eb = true;
            }
        }
    });
    return trimed_str.substring(si, ei);
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
        this.repalce_body = {};
        this.domain = domain;
    }

    APIService.prototype = {
        add_sub_domain : function(sub_domain){
            //TODO: this funtion musth check if sub_domain contains '{}' 3)#3
            var tag_regex = /\{.*\}/;
            if (tag_regex.test(sub_domain)){
                this._complex_parse(sub_domain);
            }
            else{
                this._simple_parse(sub_domain);
            }
        },
        _complex_parse : function(sub_domain){
            var tag_regex = /[/?]\{.*?\}/g;
            var matches = sub_domain.match(tag_regex);
            if (matches){
                this_obj = this;
                forEach(matches, function(mat){
                    if (startsWith(mat, '/')){
                        //TODO: create a trim_ex fn
                        this._add_replace_tag(trim_ex(mat.substring(1), ['{','}']));
                    }
                    else if (startsWith(mat, '?')){
                        var tags = trim_ex(mat.substring(1)).split(/[,|, ]/);
                        this.add_request_tags(tags);
                    }
                });
            }
        },
        _simple_parse : function(sub_domain){
            // here only check if domain ends a / and sub domain starts a / at same time
            // other overlaps blam programmer
            if (endsWith(this.domain, '/') && startsWith(subdomain, '/')){
                sub_domain = sub_domain.substring(1);
            }
            this.domain = this.domain + sub_domain;
        },
        _add_replace_tag : function(tag_name){
            this[tag_name] = this._create_replace_method(tag_name);
        },
        _create_replace_method : function(tag_name){
            var this_obj = this;
            return function(data){
                this_obj.replace_body[tag_name] = data;
                return this_obj;
            }
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

/*
1) create a api repository:

    var apis = createAPI();

2) add a api to the api repository:

    // #1
    var api = apis.add_api('douban');
    api.add_domain('https://api.douban.com/');

    // #2
    var api = apis.add_api('douabn', 'https://api.douban.com/');

3) create a api service:

    // #1
    var search = api.create_request('search');
    search.add_sub_domain('/v2/movie/search');

    // #2
    var search = api.create_request('search', '/v2/movie/search');

    // #3
    var search = api.create_request('search', '/v2/movie/search?{q,tag,start,count}');

4) add request tags that can be used on the service:

    search.add_request_tags(['q','tag', 'start', 'count']);

this will create protocol://domain/subdomain?key1=val1&key2=val2...

sometime, the api is the form protocol://domain/subdomain/request | /request/sub-subdomain
you must use this method

    var ser = api.create_request('service', '/subdomain/{tagName}');
    ser.tagName('val').send();

this will create protocol://domain/subdomain/val

5) add response tags, the result you want from the service:

    search.add_response_tags(['count', 'start', 'total', 'subjects', 'title']);

6) send a request:

    search.q('matrix').start('1').count('2').send(function(response){
        document.write(response.title);
    });
*/
