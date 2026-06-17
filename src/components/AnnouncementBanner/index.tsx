import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function AnnouncementBanner(): React.ReactElement {
  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <img src={require("@site/static/img/birdie.png").default} alt="Birdie" className={styles.birdie} />
        <div className={styles.content}>
          <span className={styles.badge}>Community Days</span>
          <span className={styles.text}>Join us for the fist ODE Community Days @ Kampala, 16th and 17th September 2026!</span>
          <Link to="https://forum.opendataensemble.org/c/community/5" className={styles.link}>
            Read more on the Forum
          </Link>
        </div>
      </div>
    </div>
  );
}

