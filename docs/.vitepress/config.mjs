import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AppleDB",
  description: "A database of Apple software and devices",

  cleanUrls: true,
  rewrites: {
    'firmware/:os_str/:key': 'firmware/:os_str/:key',
    'device/group/:group_key': 'device/group/:group_key',
    'device/:key': 'device/:key'
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/littlebyteorg/appledb' }
    ]
  }
})
