$.page = function(data){
  var body = $('body');
  if(data.title){
    $('head').append($('<title></title>').text(data.title))
  }
  $.page.append(data.items,body);
}
$.page.append = function(itemlist,parent){
  for (let i = 0; i < itemlist.length; i++) {
    let type = itemlist[i].type;
    let item = {};
    $.extend(item,$.page[type].defaults ? $.page[type].defaults : {},itemlist[i])
    parent.append($.page[type](item));
  }
}
$.page.menu = function(data){
  var menu = $('<div class="ui menu"></div>');
  $.page.append(data.items,menu);
  return menu;
}
$.page.item = function(data){
  var item = $('<a class="item"></a>').text(data.label).attr('href',data.href);
  return item;
}
$.page.item.defaults = {
  label:'',
  href:'#',
}
