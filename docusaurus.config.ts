import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ODE - Open Data Ensemble',
  tagline: 'A symphony of data instruments to support your data collection and analysis.',
  favicon: 'img/favicon.ico',

  url: 'https://docs.opendataensemble.org',
  baseUrl: '/',

  organizationName: 'opendataensemble',
  projectName: 'docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/opendataensemble/docs/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
    [
      'redocusaurus',
      {
        specs: [
          {
            id: 'synkronus-api',
            spec: 'synkronus.yaml',
            route: '/api',
          },
        ],
        theme: {
          primaryColor: '#3f51b5',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ODE',
      logo: {
        alt: 'ODE Logo',
        src: 'img/ode_logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          docsPluginId: 'default',
          position: 'left',
          label: 'Documentation',
        },
        {
          label: 'API',
          to: '/api',
          position: 'left',
        },
        {
          href: 'https://github.com/opendataensemble',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/ODE',
            },
            {
              label: 'API Reference',
              to: '/api',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/opendataensemble',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/B6FautU5',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/opendataensemble',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Open Data Ensemble. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
