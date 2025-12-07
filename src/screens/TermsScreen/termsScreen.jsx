import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

function TermsScreen() {
     return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>Terms &amp; Conditions</h1>
        <p style={styles.lastUpdated}>Last updated: November 22, 2025</p>

        <h2 style={styles.sectionTitle}>1. Introduction</h2>
        <p style={styles.text}>
          Welcome to <b>Dev.eL</b> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms &amp;
          Conditions (&quot;Terms&quot;) govern your access to and use of our website,
          content, and services (collectively, the &quot;Service&quot;). By accessing
          or using the Service, you agree to be bound by these Terms. If you do
          not agree with any part of the Terms, you must not use the Service.
        </p>

        <h2 style={styles.sectionTitle}>2. Use of the Service</h2>
        <p style={styles.text}>
          Dev.eL provides educational content related to web development and the
          MERN stack. The content is provided for informational and educational
          purposes only and should not be considered professional advice.
        </p>
        <p style={styles.text}>
          You agree to use the Service only for lawful purposes and in
          accordance with these Terms. You must not use the Service in any way
          that could damage, disable, overburden, or impair the Service, or
          interfere with any other party&apos;s use and enjoyment of the Service.
        </p>

        <h2 style={styles.sectionTitle}>3. User Accounts</h2>
        <p style={styles.text}>
          To access certain features, you may need to create an account. You
          agree to provide information that is accurate, complete, and current
          at all times. You are responsible for maintaining the confidentiality
          of your account credentials and for all activities that occur under
          your account.
        </p>
        <p style={styles.text}>
          If you believe your account has been compromised, you must notify us
          immediately. We reserve the right to suspend or terminate your account
          if we suspect any unauthorized use or breach of these Terms.
        </p>

        <h2 style={styles.sectionTitle}>4. Intellectual Property</h2>
        <p style={styles.text}>
          Unless otherwise stated, the Service and all original content,
          including text, code samples, graphics, and other materials, are the
          intellectual property of Dev.eL and its licensors. All rights are
          reserved. You may use the content for personal learning and reference,
          but you may not copy, reproduce, distribute, or create derivative
          works from our content without prior written permission.
        </p>
        <p style={styles.text}>
          Our trademarks, logos, and branding may not be used in connection with
          any product or service without our prior written consent.
        </p>

        <h2 style={styles.sectionTitle}>5. User-Generated Content</h2>
        <p style={styles.text}>
          If the Service allows you to submit comments, feedback, or other
          content (&quot;User Content&quot;), you are responsible for the content you
          provide. By submitting User Content, you grant us a non-exclusive,
          worldwide, royalty-free license to use, display, reproduce, and
          distribute that content in connection with the Service.
        </p>
        <p style={styles.text}>
          You agree that your User Content will not be unlawful, harmful,
          defamatory, or otherwise objectionable, and that it will not infringe
          the rights of any third party.
        </p>

        <h2 style={styles.sectionTitle}>6. Third-Party Services and Ads</h2>
        <p style={styles.text}>
          Our Service may display third-party content, links, or advertisements,
          including ads served through Google AdSense or other advertising
          partners. We do not control and are not responsible for the content,
          privacy policies, or practices of third-party websites or services.
        </p>
        <p style={styles.text}>
          Your interactions with third-party websites or services are solely
          between you and those third parties. We encourage you to review the
          terms and privacy policies of any third-party services you use.
        </p>

        <h2 style={styles.sectionTitle}>7. Termination</h2>
        <p style={styles.text}>
          We may suspend or terminate your access to the Service at any time,
          without prior notice, if you breach these Terms or if we decide to
          discontinue the Service. Upon termination, your right to use the
          Service will immediately cease.
        </p>

        <h2 style={styles.sectionTitle}>8. Disclaimer of Warranties</h2>
        <p style={styles.text}>
          The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis.
          We make no warranties, express or implied, regarding the accuracy,
          reliability, or completeness of the content, or the availability of
          the Service. Your use of the Service is at your sole risk.
        </p>

        <h2 style={styles.sectionTitle}>9. Limitation of Liability</h2>
        <p style={styles.text}>
          To the maximum extent permitted by law, Dev.eL shall not be liable for
          any indirect, incidental, special, consequential, or punitive damages,
          including without limitation loss of profits, data, or other
          intangible losses, arising out of or in connection with your access to
          or use of the Service, or your inability to access or use the Service.
        </p>

        <h2 style={styles.sectionTitle}>10. Governing Law</h2>
        <p style={styles.text}>
          These Terms shall be governed and construed in accordance with the
          laws applicable in your jurisdiction, without regard to its conflict
          of law provisions. Your use of the Service may also be subject to
          other local, state, national, or international laws.
        </p>

        <h2 style={styles.sectionTitle}>11. Changes to These Terms</h2>
        <p style={styles.text}>
          We may update or modify these Terms from time to time. Any changes
          will be posted on this page with an updated &quot;Last updated&quot; date.
          By continuing to access or use the Service after the revised Terms
          take effect, you agree to be bound by the updated Terms.
        </p>

        <h2 style={styles.sectionTitle}>12. Contact Us</h2>
        <p style={styles.text}>
          If you have any questions about these Terms &amp; Conditions, please
          contact us via the contact page on the website.
        </p>
      </div>
      <Footer />
    </>
  );
}

const styles = {
    container: {
        padding: '120px 5%',
        maxWidth: '960px',
        margin: '0 auto',
        lineHeight: '1.7',
        color: '#333',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    lastUpdated: {
        fontSize: '14px',
        color: '#777',
        marginBottom: '30px',
    },
    sectionTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginTop: '30px',
        marginBottom: '15px',
        borderBottom: '2px solid #eee',
        paddingBottom: '5px',
    },
    text: {
        fontSize: '16px',
        marginBottom: '15px',
    },
};

export default TermsScreen;