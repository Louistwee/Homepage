var page = {
  title: 'test',
  items: [
    {
      type: 'menu',
      menutype:'',
      items: [
        {
          type: 'item',
          label: 'link1',
          url: '#',
          action:function(){alert('hoi')},
        },
      ],
    },
  ],
}
$(function(){$.page(page);});
