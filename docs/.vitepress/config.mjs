import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AppleDB",
  description: "A database of Apple software and devices",

  rewrites: {
    'firmware/:os_str/:key': 'firmware/:os_str/:key.md',
    'device/group/:group_key': 'device/group/:group_key.md',
    'device/:key': 'device/:key.md'
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
