var title,
    ptitle,
    etitle,
    englishreg,
    chinesereg;

englishreg = /[a-zA-Z]/;
chinesereg = /[\u4e00-\u9fa5]|[\ufe30-\uffa0]/;

etitle = $('div[class=title]');
title = etitle.html();

var get_titles = function(data){
    var title,
        titles;

    title = '';
    titles = [];
    for(var i = 0, ii = data.length; i < ii; i++){
        var chr = data[i];
        var ischr = englishreg.test(chr)
            ? true
            : chinesereg.test(chr) ? true : false;
        if (ischr){
            title += chr
        }
        else{
            if (title.length > 0){
                titles.push(title);
                title = '';
            }
        }
    }
    return titles;
}

ptitle = get_titles(title)[0];

chrome.runtime.sendMessage(
    {title: ptitle},
    function(response){
        var url = response.url;
        var p = $('p:eq(1) br').first();
        var imgurl = chrome.extension.getURL('search.png');
        alert(imgurl);
        p.before('<img src="' + imgurl+ '"/>');
    }
);

