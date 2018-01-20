var page = {
  title: 'test',
  items: [
    {
      type: 'menu',
      items: [
        {
          type: 'item',
          label: 'link1',
          url: '#',
        },
      ],
    },
  ],
}
$(function(){
 $.page(page);
})
