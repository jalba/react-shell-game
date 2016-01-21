import React, { Component } from 'react';

const styles = {
    btn: {
        backgroundColor: '#4285f4',
        border: 'none',
        borderRadius: '5px',
        top: '365px',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: 15,
        minWidth: '162px',
        marginLeft: '-81px',
        left: '50%',
        padding: 15,
        position: 'absolute'
    }
};

class Button extends Component {
    render() {
    	return(
            <button style={ styles.btn } onClick={ this.props.onClick } >{ this.props.children }</button>
        );
    }
}

export default Button;