import type { ReactNode } from 'react';
import styles from './styles.module.css';
import Heading from '@theme/Heading';

export default function Newsletter(): ReactNode {
  return (
    <section className={styles.newsletter}>
      <div className="container">
        <div className={styles.newsletterContent}>
          <Heading as="h2" className={styles.newsletterTitle}>
            Stay Updated on ODE's Launch
          </Heading>
          <p className={styles.newsletterSubtitle}>
            Be the first to know when OpenDataEnsemble becomes available. Get updates on features and release dates
          </p>
          <div className={styles.newsletterForm}>
          <script async data-uid="aed91b0689" src="https://ode.kit.com/aed91b0689/index.js"></script>
          </div>
        </div>
      </div>
    </section>
  );
}
