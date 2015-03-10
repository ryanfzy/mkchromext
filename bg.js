

var ttest = function(val){
    if (test(val))
        alert(val + '(true)');
    else
        alert(val + '(false)');
};

/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    doubanapi.searchOne(request.title, function(data){
        resurl = data.alt;
        chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {url:resurl});
        });
    });
});
*/

var douban = {
    name : 'douban',
    domain : 'https://api.douban.com',
    responseType : 'json',
    apis : {
        search : {
            base : '/v2/movie/search',
            request : ['q', 'tag', 'start', 'count'],
            response : ['start', 'count', 'total', 'query', 'tag', 'subjects']
        }
    }
};


var api = createAPI();
var doubanapi = api.add_api(douban);
var rq = doubanapi.createRequest('search');
rq.q(query);
//rq.request({q: query});
rq.get('subjects', function(subjects){
    // do something with subjects
});
//api.douban.searchOne(search_for);
alert('bg.js');

// use case
// api is a register, apis added by .add_api() in this register are singletons
var api = createAPI();
var douban = api.add_api('douban');
douban.add_domain('https://api.douban.com');
// var douban = api.add_api('duban', 'https://api.douban.com');
var search = douban.create_request('search');
search.add_request_tags(['q', 'tag', 'start', 'count']);
search.add_response_tags(['start', 'count', 'total', 'query', 'tag', 'subjects']);

search.q('keyword').tag('category').start(10).count(5).send();
search.receive(function(response){
    var total = response.total;
    var subjects = response.subjects;
    // do something with 'total' and 'subjects'
});

// after we create an api named 'douban', we get always retrieve it when we need it
var doubanapi = api.get_api('douban');

