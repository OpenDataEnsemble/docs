import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Consolidated sidebar structure following documentation best practices:
 * - User-focused content first
 * - Related content grouped together
 * - Avoid overcrowding with too many small pages
 * - Clear separation between user and developer content
 */
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'doc',
      id: 'index',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/what-is-ode',
        'getting-started/why-ode',
        'getting-started/key-concepts',
        'getting-started/installation',
        'getting-started/installing-formulus',
        'getting-started/quick-start',
        'getting-started/faq',
      ],
    },
    {
      type: 'category',
      label: 'Using ODE',
      items: [
        'using/your-first-form',
        'using/formulus-features',
        'using/app-bundles',
        'using/data-management',
        'using/synchronization',
        'using/custom-applications',
        'using/working-offline',
        'using/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/form-design',
        'guides/custom-applications',
        'guides/deployment',
        'guides/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/api',
        'reference/components',
        'reference/formulus',
        'reference/formplayer',
        'reference/synkronus-cli',
        'reference/synkronus-server',
        'reference/synkronus-portal',
        'reference/form-specifications',
        'reference/app-bundle-format',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'development/setup',
        'development/installing-formulus-dev',
        'development/architecture',
        'development/formulus-development',
        'development/formplayer-development',
        'development/synkronus-development',
        'development/synkronus-portal-development',
        'development/contributing',
        'development/building-testing',
        'development/extending',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/getting-help',
        'community/examples',
      ],
    },
  ],
};

export default sidebars;
