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

function flatten(original, result){
    result = result || [];
    forEach(original, function(item){
        if (Array.isArray(item)){
            flatten(flatten(item, result));
        }
        else{
            result.push(item);
        }
    });
    return result;
}

function _nest_copy(source, fields){
    if (fields.length == 1){
        return source[fields[0]];
    }
    
    var f = fields[0];
    if (startsWith(f, '@')){
        var ar = [];
        var k = f.substring(1);
        forEach(source[k], function(v){
            var cp = _nest_copy(v, fields.slice(1));
            ar.push(cp);
        });
        return flatten(ar);
    }
    else{
        return _nest_copy(source[f], fields.slice(1));
    }
}

function copy_ex(source, members){
    var cp = {};

    if (Array.isArray(members)){
        forEach(members, function(member){
            cp[member] = members[member];
        });
    }
    else if (typeof members === 'object'){
        var startForArray = false;
        forEach(members, function(v, k){
            var fields = v.split('.');
            if (fields.length == 1){
                cp[k] = source[v];
            }
            else if (fields.length > 1){
                cp[k] = _nest_copy(source, fields);
            }
        });
    }

    return cp;
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
