var page = {
  title: '',
  favicon: '',
  items: [
    {
      type: 'Horizontal-navigation',
      fixed: true,
      items: [
        {
          type: 'Home',
          title: 'Home',
          url: 'hompage.html',
        },
        {
          type: 'link',
          title: 'link1',
          url: '#',
        },
        {
          type: 'link',
          title: 'link2',
          url: '#',
        },
        {
          type: 'dropdown',
          title: 'dropdown',
          url: '#',
          items: [
            {
              type: 'link',
              title: 'sub1',
              url: '#',
            },
            {
              type: 'link',
              title: 'sub2',
              url: '#',
            }
          ]
        },
        'right',
        {
          type: 'search',
          title: 'search',
          url: '#',
        },
      ],
    },
  ],
}
$.page(page);
