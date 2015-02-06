var bool = function(val){
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
};

var ttest = function(val){
    if (test(val))
        alert(val + '(true)');
    else
        alert(val + '(false)');
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    sendResponse({url:'hello'});
});
