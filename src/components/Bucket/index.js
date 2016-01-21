import React, { Component } from 'react';

const styles = {
	container: {
		cursor: 'pointer',
		float: 'left',
		margin: '15px 30px',
		position: 'absolute'
	},
    bucket: {
        borderBottom: '80px solid red',
        borderLeft: '40px solid transparent',
        borderRight: '40px solid transparent',
        height: 0,
        position: 'relative',
        transitionDuration: '300ms',
        width: 40
    },
    ball: {
    	display: 'block',
        background: 'black',
        borderRadius: '50%',
        height: 30,
        width: 30,
        margin: '10px 45px',
        background: 'radial-gradient(circle at 10px 10px, #5cabff, #000)'
    }
};

class Bucket extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	selected: this.props.selected,
            open: this.props.open,
            animation: {}
        };
    }
    componentWillReceiveProps(nextProps) {
    	const animation = nextProps.open ? { transform: 'translateY(0px)' } : { transform: 'translateY(40px)' }
    	if(nextProps.open !== this.state.open) {
    		this.setState({ animation: animation, open: nextProps.open });
    	}
    }
    onClick(e) {
    	if(!this.state.open) {
    		const animation = { transform: 'translateY(0px)' };
    	    this.setState({ animation: animation, open: true });
    	    this.props.onClick();
    	}
    }
    render() { 
    	const animation = this.state ? this.state.animation : {};
    	const bucketStyles = Object.assign(styles.bucket, animation);
    	const stylesContainer = Object.assign(styles.container, { left: this.props.left });
        return (
        	<div onClick={this.onClick.bind(this) } style={ stylesContainer } >
                <div style={ bucketStyles } />
                { this.props.selected ? <span style={ styles.ball } /> : null }
            </div>
        );
	}
}

export default Bucket;