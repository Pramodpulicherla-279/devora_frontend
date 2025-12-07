import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

function PrivacyPolicyScreen() {
    return (
        <>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.title}>Privacy Policy</h1>
                <p style={styles.lastUpdated}>Last updated: December 08, 2025</p>

                <h2 style={styles.sectionTitle}>1. Introduction</h2>
                <p style={styles.text}>
                    At Dev.eL, we value your privacy and are committed to protecting your personal information. This Privacy Policy describes the types of data we collect, how we use it, and the measures we take to keep it secure. By accessing or using our Service, you acknowledge and agree to the practices described in this policy.                </p>

                <h2 style={styles.sectionTitle}>2. Information We Collect</h2>
                <p style={styles.text}>
                    We collect information to provide a better learning experience and to maintain the functionality of our platform.
                </p>

                <p><strong>Personal Information</strong> <br /> We may ask you to provide certain details that help us identify or contact you. This may include, but is not limited to:</p>
                <ul style={styles.list}>
                    <li><strong>Your name</strong></li>
                    <li><strong>Email address</strong></li>
                    <li><strong>Mobile Number</strong></li>
                </ul>
                <p>These details are collected when you register on the site, subscribe to updates, or interact with features that require user input.</p>

                <p><strong>Usage Information</strong><br />We also collect data related to how you access and interact with the Service. This may include:</p>

                <ul>
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Pages you visit on our platform</li>
                    <li>Time and date of your visits</li>
                    <li>Device and diagnostic information</li>
                </ul>
                <p>This data helps us understand how users engage with Dev.eL and allows us to improve performance and usability.</p>

                <h2 style={styles.sectionTitle}>3. How We Use Your Information</h2>
                <p style={styles.text}>
                    We use the information we collect for purposes such as:
                </p>
                <ul style={styles.list}>
                    <li>Operating and improving the Service</li>
                    <li>Keeping you updated about changes or new features</li>
                    <li>Enabling interactive or personalized features</li>
                    <li>Providing customer support</li>
                    <li>Analyzing usage patterns to enhance user experience</li>
                    <li>Ensuring the overall stability and security of the platform</li>
                </ul>

                <h2 style={styles.sectionTitle}>4. Data Security</h2>
                <p style={styles.text}>
                   We take data security seriously and use reasonable measures to protect your information. However, no method of online transmission or digital storage is completely secure. While we work to safeguard your Personal Data, we cannot guarantee absolute protection.
                </p>

                <h2 style={styles.sectionTitle}>5. Updates to This Policy</h2>
                <p style={styles.text}>
                    We may revise this Privacy Policy periodically. When updates occur, we will post the latest version on this page. We encourage you to review the policy from time to time to stay informed about how we protect your information.
                </p>

                <h2 style={styles.sectionTitle}>6. Contact Us</h2>
                <p style={styles.text}>
                    If you have any questions or concerns regarding this Privacy Policy or your personal data, feel free to contact us.
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