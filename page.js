(function ($) {
  $.page = function (data) {
    var body = $('body');
    if (data.title) {
      $('head').append($('<title></title>').text(data.title));
    }
    $.page.append(data.items, body);
    body.addContextmenu({
      items: [
        {
          type: 'item',
          label: 'Reload',
          action: function () {
            window.location.reload(true);
          },
          contextmenu: false,
        },
        {
          type: 'item',
          label: 'Reload page from cache',
          action: function () {
            window.location.reload(false);
          },
          contextmenu: false,
        },
      ]
    })
  };
  $.page.append = function (itemlist, parent) {
    for (var i = 0; i < itemlist.length; i++) {
      var type = itemlist[i].type;
      var item = {
      };
      $.extend(item, $.page[type].defaults ? $.page[type].defaults : {
      }, itemlist[i])
      parent.append($.page[type](item));
    }
  };
  $.page.menu = function (data) {
    var menu = $('<div class="ui menu"></div>');
    menu.addClass(data.menutype);
    $.page.append(data.items, menu);
    return menu;
  };
  $.page.menu.defaults = {
    menutype: 'fixed',
  };
  $.page.item = function (data) {
    var item = $('<a class="item"></a>').html(data.label).attr('href', data.href);
    try {
      item.attr(data.attr);
    } catch (err) {
    }
    if (data.action) {
      item.on('click', data.action);
    }
    if (item.contextmenu) {
      item.addContextmenu({
        items: [
          {
            type: 'item',
            label: 'Copy link',
            action: function () {
              $.copyTextToClipboard(data.href);
            },
            contextmenu: false,
          },
          {
            type: 'item',
            label: 'Open link in new tab',
            href: data.href,
            attr: {
              target: '_blank'
            },
            contextmenu: false,
          },
        ]
      })
    }
    return item;
  };
  $.page.item.defaults = {
    label: '',
    href: '#',
    contextmenu: true,
    attr: {
    },
  };
  $.page.search = function (data) {
    var search = $('<div class="ui category search item"><div class="ui transparent icon input"><input class="prompt" type="text"><i class="search link icon"></i></div><div class="results"></div></div>');
    search.results = search.find('.results');
    search.submit = search.find('i');
    search.input = search.find('input');
    search.input.attr('placeholder', data.label);
    var submit = function () {
      var searchData = {
        value: search.input[0].value,
        stopLoading: function () {
          search.removeClass('loading');
        },
        showResults: function (results) {
          search.removeClass('loading');
        },
      }
      data.action(searchData);
      search.addClass('loading');
    };
    search.input.on('keypress', function (event) {
      if (event.which === 13) {
        submit(event);
      }
    });
    search.submit.on('click', submit);
    return search;
  };
  $.page.search.defaults = {
    label: 'Search...'
  };
  $.page.text = function (data) {
    var text = $('<p class="item"></p>').html($.markup(data.text));
    return text;
  };
  $.page.text.defaults = {
    text: ''
  };
  $.fn.addContextmenu = function (data) {
    $(this).on('contextmenu', function (event) {
      if (event.timeStamp !== $.contextmenu.lastTimestamp) {
        $.contextmenu.menu.blur();
        $.contextmenu.lastTimestamp = event.timeStamp;
      }
      if (data.stopPropagation) {
        event.preventDefault();
        event.stopPropagation();
      }
      console.log(data);
      $.page.append(data.items, $.contextmenu.menu);
    });
  };
  $.contextmenu = {
  };
  $.contextmenu.lastTimestamp = '';
  $.contextmenu.menu = $('<div class="ui fixed menu vertical transition hidden"></div>');
  $.contextmenu.menu.on('blur', function () {
    $.contextmenu.menu.removeClass('visible animating slide down in');
    $.contextmenu.menu.addClass('hidden');
    $.contextmenu.menu.html('');
  });
  $(function () {
    $('html').append($.contextmenu.menu);
    $(document).on('click', function () {
      $.contextmenu.menu.blur();
    })
    $(document).on('contextmenu', function (event) {
      event.preventDefault();
      if (event.timeStamp !== $.contextmenu.lastTimestamp) {
        $.contextmenu.menu.blur();
        $.contextmenu.lastTimestamp = event.timeStamp;
      }
      if ($.contextmenu.menu.html()) {
        $.contextmenu.menu.addClass('animating slide down in');
        $.contextmenu.menu.css('left', event.pageX);
        $.contextmenu.menu.css('top', event.pageY);
        setTimeout(function () {
          $.contextmenu.menu.removeClass('animating slide down in');
          if ($.contextmenu.menu.html()) {
            $.contextmenu.menu.addClass('visible');
            $.contextmenu.menu.focus();
          }
        }, 500);
      }
    })
  })
  $.copyTextToClipboard = function (text) {
    var textArea = $('<textarea></textarea>').css({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '2em',
      height: '2em',
      padding: 0,
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      background: 'transparent',
    }).attr('value', text).appendTo('body') [0];
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      //console.log('Copying text command was ' + msg);
    } catch (err) {
      //console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
  };
  $.markup = function (text) {
    var keys = $.markup.keys;
    var key = '';
    for(var i in keys){
      key += i;
    }
    console.log(key);
    var regex = new RegExp('([' + key + ']+)()?(.+?)\\2?\\1','g');
    //var regex = /([*`_^]+)()?(.+?)\2?\1/g;
    var result = text;
    var m;
    
    var start = '';
    var end = '';
    while ((m = regex.exec(text)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }      //do the replacemnts

      for (var i = 0; i < m[1].length; i++) {
        start = start + keys[m[1][i]][0];
        end = keys[m[1][i]][1] + end;
      }
      result = result.replace(m[0], start + m[3] + end);
      console.log(result);
      console.log(m);
      console.log(start);
      start = '';
      end = '';
    }
    return result;
  };
  $.markup.keys = {
    '*': ['<b>','</b>'],
    '`': ['<i>','</i>'],
    '_': ['<u>','</u>'],
    '^': ['<i class="',' icon"></i>'],
  };
  return;
}) ($)
