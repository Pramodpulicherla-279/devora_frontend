import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

function PrivacyPolicyScreen() {
    return (
        <>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.title}>Privacy Policy</h1>
                <p style={styles.lastUpdated}>Last updated: November 22, 2025</p>

                <h2 style={styles.sectionTitle}>1. Introduction</h2>
                <p style={styles.text}>
                    Dev.eL is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
                </p>

                <h2 style={styles.sectionTitle}>2. Information We Collect</h2>
                <p style={styles.text}>
                    We may collect personal identification information in various ways, including, but not limited to, when you register on the site, subscribe to a newsletter, and in connection with other activities, services, features, or resources we make available.
                </p>
                <ul style={styles.list}>
                    <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to, your email address and name.</li>
                    <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's IP address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, and other diagnostic data.</li>
                </ul>

                <h2 style={styles.sectionTitle}>3. How We Use Your Information</h2>
                <p style={styles.text}>
                    We use the collected data for various purposes:
                </p>
                <ul style={styles.list}>
                    <li>To provide and maintain our Service.</li>
                    <li>To notify you about changes to our Service.</li>
                    <li>To allow you to participate in interactive features of our Service when you choose to do so.</li>
                    <li>To provide customer support.</li>
                    <li>To gather analysis or valuable information so that we can improve our Service.</li>
                    <li>To monitor the usage of our Service.</li>
                </ul>

                <h2 style={styles.sectionTitle}>4. Data Security</h2>
                <p style={styles.text}>
                    The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>

                <h2 style={styles.sectionTitle}>5. Changes to This Privacy Policy</h2>
                <p style={styles.text}>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>

                <h2 style={styles.sectionTitle}>6. Contact Us</h2>
                <p style={styles.text}>
                    If you have any questions about this Privacy Policy, please contact us.
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
    list: {
        paddingLeft: '20px',
    }
};

export default PrivacyPolicyScreen;