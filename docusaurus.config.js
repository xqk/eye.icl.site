// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'eye',
  tagline: '灵活、强大、易用的开源运维平台',
  url: 'https://eye.icl.site',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'xqk', // Usually your GitHub org/user name.
  projectName: 'eye', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          lastVersion: 'current',
          versions: {
            current: {
              label: '3.x'
            }
          },
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/xqk/eye.icl.site/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl: 'https://github.com/xqk/eye.icl.site/tree/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true
      },
      navbar: {
        logo: {
          alt: 'eye Logo',
          src: 'img/logo-eye-txt.png',
        },
        items: [
          {
            type: 'docsVersionDropdown',
            position: 'left'
          },
          {
            type: 'doc',
            docId: 'about/about-eye',
            position: 'left',
            label: '文档',
          },
          {
            type: 'dropdown',
            label: '教程',
            position: 'left',
            items: [
              {
                type: 'doc',
                label: 'Java发布配置',
                docId: 'example/example-java'
              },
              {
                type: 'doc',
                label: 'Node发布配置',
                docId: 'example/example-node'
              },
            ],
          },
          {to: '/blog', label: '博客', position: 'left'},
          {
            label: '问题反馈',
            position: 'left',
            href: 'https://github.com/xqk/eye/issues',
          },
          {to: '/about', label: '关于', position: 'right'},
          {to: '/sponsorship', label: '赞助', position: 'right'},
          {
            href: 'https://github.com/xqk/eye',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '快速开始',
                to: '/docs/install-docker',
              },
              {
                label: '使用手册',
                to: '/docs/host-manage'
              }
            ],
          },
          {
            title: '社区',
            items: [],
          },
          {
            title: '更多',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/xqk/eye',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} eye Team`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
