import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function AnnouncementBanner(): React.ReactElement {
  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <img src={require("@site/static/img/birdie.png").default} alt="Birdie" className={styles.birdie} />
        <div className={styles.content}>
          <span className={styles.badge}>NEW</span>
          <span className={styles.text}>Try the Formulus Android app pre-release!</span>
          <Link to="/docs/quick-start/formulus-app" className={styles.link}>
            Install Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
