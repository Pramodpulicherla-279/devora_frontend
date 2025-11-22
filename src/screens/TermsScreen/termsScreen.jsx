import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

function TermsScreen() {
    return (
        <>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.title}>Terms & Conditions</h1>
                <p style={styles.lastUpdated}>Last updated: November 22, 2025</p>

                <h2 style={styles.sectionTitle}>1. Introduction</h2>
                <p style={styles.text}>
                    Welcome to <b>Dev.eL</b>, These Terms & Conditions govern your use of our website and services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the Service.
                </p>

                <h2 style={styles.sectionTitle}>2. Use of the Service</h2>
                <p style={styles.text}>
                    Our Service provides educational content related to MERN stack development. This content is provided for informational and educational purposes only. You agree not to use the Service for any unlawful purpose or in any way that could harm, disable, overburden, or impair the Service.
                </p>

                <h2 style={styles.sectionTitle}>3. User Accounts</h2>
                <p style={styles.text}>
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                </p>

                <h2 style={styles.sectionTitle}>4. Intellectual Property</h2>
                <p style={styles.text}>
                    The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Dev.eL and its licensors. The content is protected by copyright and other laws. Our trademarks may not be used in connection with any product or service without the prior written consent of Dev.eL.
                </p>

                <h2 style={styles.sectionTitle}>5. Termination</h2>
                <p style={styles.text}>
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                </p>

                <h2 style={styles.sectionTitle}>6. Limitation of Liability</h2>
                <p style={styles.text}>
                    In no event shall Dev.eL be liable for any indirect, incidental, special, consequential or punitive damages, including loss of profits, data, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>

                <h2 style={styles.sectionTitle}>7. Governing Law</h2>
                <p style={styles.text}>
                    These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is based, without regard to its conflict of law provisions.
                </p>

                <h2 style={styles.sectionTitle}>8. Changes to Terms</h2>
                <p style={styles.text}>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>

                <h2 style={styles.sectionTitle}>9. Contact Us</h2>
                <p style={styles.text}>
                    If you have any questions about these Terms, please contact us via the contact page.
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