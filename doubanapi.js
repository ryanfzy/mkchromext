var doubanapi = (function(){
    var domain = 'http://api.douban.com/v2/movie/';
    var search = createAPI.createService(domain + 'search?{q,tag,count}');
    var subject = createAPI.createService(domain + 'subject/{id}');

    var searchImpl = function(q, tag, count){
        // encodeURIComponent should built into createAPI
        q = encodeURIComponent(q);
        search.startNew();
        if (q){
            search.q(q);
        }
        if (tag){
            search.tag(tag);
        }
        if (count){
            search.count(count);
        }
        var res = search.build();
        return res;
    };

    return {
        Search : searchImpl,
        Subject : subject
    }
})();
//alert('doubanapi.js');
