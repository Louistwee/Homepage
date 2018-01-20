$.page = function(page){
  var body = $('body');
  if(page.title){
    $('head').append($('<title></title>').text(page.title))
  }
  for (i = 0; i < page.items.length; i++) {
    body.append($.page[page.items[i]](page.items[i]));
  } 
}
