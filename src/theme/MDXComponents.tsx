import type { MDXComponents } from 'mdx/types';
import Cards from '../components/Cards';
import Card from '../components/Card';

export default function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Cards,
    Card,
    ...components,
  };
}

