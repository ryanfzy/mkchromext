chrome.app.runtime.onLaunched.addListener(function(){
    chrome.app.window.create('htmltotest.html', {
        'bounds': {
            'width': 400,
            'height': 500
        }
    });
});

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

var apis = createAPI();

(function(){
var doubanapi = apis.add_api('douban');
doubanapi.add_domain('https://api.douban.com/');

var search = doubanapi.create_request('search');
search.add_sub_domain('v2/movie/search');
search.add_request_tags(['q', 'tag','start', 'count']);

var subject = doubanapi.create_request('subject');
subject.add_sub_domain('v2/movie/subject/{id}');

var celebrity = doubanapi.create_request('celebrity');
celebrity.add_sub_domain('v2/movie/celebrity/{id}');

var top250 = doubanapi.create_request('top250');
top250.add_sub_domain('v2/movie/top250');

var usbox = doubanapi.create_request('usbox');
usbox.add_sub_domain('v2/movie/us_box');
})(); 

var doubanapi = apis.get_api('douban');
var search = doubanapi.get_request('search');
var subject = doubanapi.get_request('subject');
search.q('matrix').count(1).send(function(data){
    var sub = data.subjects[0];
    document.write(sub.title);
    document.write('<img src="'+sub.images.medium+'"/>');
});
