import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar configuration for ODE Documentation
 */
const sidebars: SidebarsConfig = {
  docs: [
    'ODE',
    {
      type: 'category',
      label: 'Quick Start',
      items: [
        'quick-start/index',
        'quick-start/prerequisites',
        'quick-start/setup-environment',
        'quick-start/deploy-local-instance',
        'quick-start/upload-test-data',
        {
          type: 'category',
          label: 'Installation',
          items: [
            'quick-start/formulus-app',
            'quick-start/synkronus-server',
            'quick-start/custom-app',
          ],
        },
        'quick-start/faq',
      ],
    },
    {
      type: 'category',
      label: 'Technical Overview',
      items: [
        'technical-overview/index',
        {
          type: 'category',
          label: 'Architecture',
          items: [
            'technical-overview/architecture/overview',
            'technical-overview/architecture/components',
            'technical-overview/architecture/data-flow',
          ],
        },
        {
          type: 'category',
          label: 'Concepts',
          items: [
            'technical-overview/concepts/overview',
            'technical-overview/concepts/offline-first',
            'technical-overview/concepts/json-forms',
            'technical-overview/concepts/app-bundles',
            'technical-overview/concepts/custom-apps',
          ],
        },
        {
          type: 'category',
          label: 'Database',
          items: [
            'technical-overview/database/overview',
            'technical-overview/database/schema',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Build',
      items: [
        'build/index',
        {
          type: 'category',
          label: 'Forms',
          items: [
            'build/forms/overview',
            {
              type: 'category',
              label: 'Form Design',
              items: [
                'build/forms/design/schema-definition',
                'build/forms/design/ui-schema',
                'build/forms/design/validation',
                'build/forms/design/conditional-logic',
              ],
            },
            {
              type: 'category',
              label: 'Advanced Features',
              items: [
                'build/forms/advanced-features/multimedia',
                'build/forms/advanced-features/location',
                'build/forms/advanced-features/attachments',
              ],
            },
            'build/forms/versioning',
          ],
        },
        {
          type: 'category',
          label: 'Custom Applications',
          items: [
            'build/custom-applications/overview',
            'build/custom-applications/building',
            'build/custom-applications/app-bundle-structure',
            'build/custom-applications/deployment',
            'build/custom-applications/custom-renderers',
          ],
        },
        {
          type: 'category',
          label: 'Data Management',
          items: [
            'build/data-management/overview',
            'build/data-management/observations',
            'build/data-management/attachments',
            'build/data-management/export',
            'build/data-management/import',
          ],
        },
        {
          type: 'category',
          label: 'Synchronization',
          items: [
            'build/synchronization/overview',
            'build/synchronization/sync-protocol',
            'build/synchronization/conflict-resolution',
            'build/synchronization/troubleshooting',
          ],
        },
        'build/users-authentication',
        'build/translations',
        'build/branding',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        {
          type: 'category',
          label: 'Formulus',
          items: [
            'components/formulus/overview',
            'components/formulus/installation',
            'components/formulus/configuration',
            'components/formulus/features',
            'components/formulus/troubleshooting',
            'components/formulus/integration',
          ],
        },
        {
          type: 'category',
          label: 'Synkronus',
          items: [
            'components/synkronus/overview',
            'components/synkronus/installation',
            'components/synkronus/configuration',
            'components/synkronus/api-reference',
          ],
        },
        {
          type: 'category',
          label: 'Synkronus CLI',
          items: [
            'components/synkronus-cli/overview',
            'components/synkronus-cli/installation',
            'components/synkronus-cli/commands-reference',
          ],
        },
        {
          type: 'category',
          label: 'Formplayer',
          items: [
            'components/formplayer/overview',
            'components/formplayer/integration',
          ],
        },
        {
          type: 'category',
          label: 'Documentation',
          items: [
            'documentation/formulus/formulus',
            'documentation/synkronus/synkronus',
            'documentation/synkronus/app-bundle',
            'documentation/synkronus-cli/cli',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Host',
      items: [
        'host/index',
        {
          type: 'category',
          label: 'Synkronus Server',
          items: [
            'host/synkronus-server/overview',
            'host/synkronus-server/requirements',
            'host/synkronus-server/production',
            'host/synkronus-server/docker',
            'host/synkronus-server/kubernetes',
            'host/synkronus-server/cloud',
            'host/synkronus-server/monitoring',
            'host/synkronus-server/backups',
          ],
        },
        {
          type: 'category',
          label: 'Monitoring & Alerting',
          items: [
            'host/monitoring/overview',
            'host/monitoring/setup',
            'host/monitoring/production',
          ],
        },
        'host/data-management',
        'host/security',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/index',
        {
          type: 'category',
          label: 'REST API',
          items: [
            'reference/rest-api/overview',
            'reference/rest-api/authentication',
            'reference/rest-api/app-bundle',
            'reference/rest-api/sync',
            'reference/rest-api/attachments',
          ],
        },
        {
          type: 'category',
          label: 'Configuration',
          items: [
            'reference/configuration/server',
            'reference/configuration/client',
          ],
        },
        'reference/form-specifications',
        'reference/app-bundle-format',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'tutorials/index',
        {
          type: 'category',
          label: 'Getting Started',
          items: [
            'tutorials/getting-started/first-form',
            'tutorials/getting-started/first-custom-app',
            'tutorials/getting-started/connecting-everything',
          ],
        },
        {
          type: 'category',
          label: 'Advanced Topics',
          items: [
            'tutorials/advanced/complex-forms',
            'tutorials/advanced/custom-renderers',
            'tutorials/advanced/performance',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/index',
        {
          type: 'category',
          label: 'Contribute',
          items: [
            'community/contribute/about',
            'community/contribute/first-time',
            'community/contribute/code-of-conduct',
          ],
        },
        {
          type: 'category',
          label: 'Support',
          items: [
            'community/support/getting-help',
            'community/support/reporting-issues',
          ],
        },
        {
          type: 'category',
          label: 'Resources',
          items: [
            'community/resources/examples',
            'community/resources/projects',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'For Developers',
      items: [
        'For-developers/docusaurus/intro',
        {
          type: 'category',
          label: 'Tutorial Extras',
          items: [
            'For-developers/docusaurus/tutorial-extras/manage-docs-versions',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
