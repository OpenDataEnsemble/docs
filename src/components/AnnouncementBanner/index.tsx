import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function AnnouncementBanner(): React.ReactElement {
  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <img src={require("@site/static/img/birdie.png").default} alt="Birdie" className={styles.birdie} />
        <div className={styles.content}>
          <span className={styles.badge}>New version released!</span>
          <span className={styles.text}>Great news! The ODE v1.0 is now available for download!</span>
          <Link to="/docs/getting-started/installation/installing-formulus" className={styles.link}>
            Install Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

