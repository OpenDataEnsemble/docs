import type { ReactNode } from 'react';
import styles from './styles.module.css';
import Heading from '@theme/Heading';

export default function Newsletter(): ReactNode {
  return (
    <section className={styles.newsletter}>
      <div className="container">
        <div className={styles.newsletterContent}>
          <div className={styles.newsletterGrid}>
            <div className={styles.newsletterLeft}>
              <Heading as="h2" className={styles.newsletterTitle}>
                Stay Updated on ODE's Launch
              </Heading>
              <p className={styles.newsletterSubtitle}>
                Be the first to know when OpenDataEnsemble becomes available. Get updates on features and release dates
              </p>
              <div className={styles.newsletterForm}>
                <form 
                  action="https://app.kit.com/forms/8427451/subscriptions" 
                  method="post" 
                  className={styles.form}
                  data-sv-form="8427451"
                >
                  <div className={styles.formContent}>                
                    <div className={styles.formFields}>
                      <input 
                        type="email" 
                        name="email_address" 
                        placeholder="Email Address" 
                        required 
                        className={styles.emailInput}
                        aria-label="Email Address"
                      />
                      <button type="submit" className={styles.submitButton}>
                        Subscribe
                      </button>
                    </div>
                    
                    <p className={styles.privacy}>
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                </form>
              </div>
            </div>
            
            <div className={styles.newsletterRight}>
              <img 
                src={require('@site/static/img/newsletter_raff.png').default} 
                alt="Giraffe reading a newsletter" 
                className={styles.giraffeImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
