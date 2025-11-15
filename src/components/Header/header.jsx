import React from 'react';

function Header() {
    return (
        <div style={styles.headerContainer}>
            Devora
        </div>
    );
}
const styles = {
    headerContainer: {
        marginBottom: 12,
        // backgroundColor: 'black',
        color: 'black',
        padding: '16px 32px',
        borderRadius: 12,
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: '2px',

    }
};

export default Header;