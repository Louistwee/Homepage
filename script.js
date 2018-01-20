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
          text: 'Hello welcome on the example page of *page.js*.<br> Try to use your _right mouse_ on severeal elements. <br>You can simply include icons ^car^ like this*^car^*',
        },
  ],
}
$(function(){$.page(page);});
