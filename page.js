$.page = function(data){
  var body = $('body');
  if(data.title){
    $('head').append($('<title></title>').text(data.title))
  }
  $.page.append(data.items,body);
}
$.page.append = function(itemlist,parent){
  for (i = 0; i < itemlist.length; i++) {
    let item;
    $.extend(item,$.page[itemlist[i]].defaults,itemlist[i])
    parent.append($.page[itemlist[i]](item));
  }
}
$.page.menu = function(data){
  var menu = $('<div class="ui menu"></div>');
  $.page.append(data.items,menu);
}
$.page.item = function(data){
  var item = $('<a class="item"></a>').text(data.label).attr('href',data.href);
}
$.page.item.defaults = {
  label:'',
  href:'#',
}
