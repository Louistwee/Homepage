$(function(){
  $.feed('http://www.rssboard.org/files/sample-rss-2.xml',function(feed){
    $('#feed-ticker').text(feed.items[0].title);
  })
  
})
$.feed = function(URL,succes){
  $.get(URL, function (data) {
    var $data = $(data);
    var result = {
      title:$data.children('title').text(),
      items:[],
    };
    $data.find("item").each(function () { // or "item" or whatever suits your feed
      var $item = $(this);
      result.items.push({
        title:$item.children("title"),
        author:$item.children("author"),
        description:$item.children("description"),
      })
    });
    succes(result);
  });
}
