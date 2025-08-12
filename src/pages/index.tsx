import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Newsletter from '@site/src/components/Newsletter';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <img src={require('@site/static/img/ensemble.png').default} className={styles.featureImg} alt="The Open Data Ensemble" />
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <Newsletter />
        <HomepageFeatures />
        <section className="hero hero--primary" style={{padding: '4rem 0'}}>
          <div className="container">
            <div style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
              <Heading as="h2" style={{fontSize: '2rem', marginBottom: '1rem', color: 'white'}}>
                Ready to Get Started?
              </Heading>
              <p style={{fontSize: '1.2rem', marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6'}}>
                Peruse the documentation for the Synkronus API and learn how to integrate ODE into your mobile data collection workflow.
              </p>
              <Link
                className="button button--secondary button--lg"
                to="/docs/ODE">
                ODE Documentation (work in progress) - 3min ⏱️
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
