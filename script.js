var page = {
  title: 'Example',
  items: [
    {
      type: 'menu',
      menutype:'',
      items: [
        {
          type: 'item',
          label: 'Item 1',
          url: '#',
          action:function(){alert('hoi')},
        },
        {
          type: 'item',
          label: 'Check out how this page is made!!!',
          url: 'https://github.com/Louistwee/Homepage/blob/master/script.js',
        },
        {
          type: 'search',
          label: 'Zoeken...',
          action: function(data){
            setTimeout(function(){
              data.stopLoading();
            },2000);
            setTimeout(function(){
              var answ = prompt(data.value);
            },1);
          },
        },
      ],
    },
    {
      type: 'text',
      text: 'Hello welcome on the example page of *page.js*.<br> Try to use your _right mouse_ on severeal elements to open the custom Contextmenu. <br>You can simply include icons ^car^ like this*^car^* <br>This page is writen in *JS*',
    },
  ],
}
$(function(){$.page(page);});
