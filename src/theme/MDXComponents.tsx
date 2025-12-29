import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import type {MDXComponents} from 'mdx/types';

export default function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Make Tabs and TabItem available in MDX
    Tabs,
    TabItem,
    // Spread other components
    ...components,
  };
}

