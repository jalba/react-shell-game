import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Bucket from './components/Bucket';
import Button from './components/Button';

const styles = {
    container: {
        backgroundColor: '#cadfaa',
        borderRadius: '10px',
        fontFamily: 'Helvetica',
        height: 410,
        margin: '30px auto 0 auto',
        minWidth: '620px',
        width: '50%'
    },
    bucketRow: {
        width: '87%',
        margin: '30px auto',
        position: 'relative'
    },
    title: {
      color: 'brown',
      paddingTop: '20px',
      textAlign: 'center'
    },
    controls: {
      clear: 'both',
      height: 50,
      lineHeight: '50px',
      position: 'relative',
      bottom: '-65px',
      textAlign: 'center'
    },
    prompt: {
      color: 'brown',
      paddingTop: '20px',
      textAlign: 'center'
    }
};


export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shuffling: false,
            started: false,
            finished: false,
            prompt: ''
        };
    }
    handleClick(e) {
        e.preventDefault();
        if(this.state.started) {
            this.setState({ shuffling: true, prompt: 'shuffling...' }, () => {
                setTimeout(() => {
                    this.shuffle();
                }, 400);
                setTimeout(() => {
                    this.setState({ suffling: false, started: false, prompt: 'Done, now pick a bucket!' });
                }, 1000);
            });
        } else {
            this.selectBucket();
        }
    }
    shuffle() {
        const refs = this.refs;
        const randomArray = [0,1,2].sort(() => { return .5 - Math.random(); })
        const rando1 = randomArray[0];
        const rando2 =  randomArray[1];
        const rando3 = randomArray[2];
        const bucket1 = ReactDOM.findDOMNode(refs[rando1]);
        const bucket2 = ReactDOM.findDOMNode(refs[rando2]);
        const bucket3 = ReactDOM.findDOMNode(refs[rando3]);
        const bucket1Left = 180 * rando1;
        const bucket2Left = 180 * rando2;
        const bucket3Left = 180 * rando3;
        this.animateShuffle(bucket1, bucket2Left, bucket1Left, 400);
        this.animateShuffle(bucket2, bucket1Left, bucket2Left, 400);
        this.animateShuffle(bucket3, bucket2Left, bucket3Left, 400);
        this.animateShuffle(bucket1, bucket3Left, bucket2Left, 400);
    }
    animateShuffle(el, to, from, time){
        const start = new Date().getTime();
        const timer = setInterval(function() {
            const step = Math.min(1,(new Date().getTime()-start)/time);
            el.style.left = (from+step*(to-from))+'px';
            if( step == 1) clearInterval(timer);
        },25);
       el.style.left = from+'px';
    }
    selectBucket() {
      let stateCopy = this.state;
      stateCopy.started = true;
      stateCopy.shuffling = false;
      stateCopy.finished = false;
      stateCopy.prompt = '';
      stateCopy.selected = this.chooseRandomBucket();
      this.setState(stateCopy);
    }
    chooseRandomBucket() {
        return Math.floor(Math.random() * (2 - 0 + 1));
    }
    bucketClick(idx) {
        return () => {
            if(!this.state.finished) {
                const selected = this.chooseRandomBucket();
                if(idx !== selected) {
                    this.setState({ 
                        prompt: 'Sorry, you loose', 
                        selected: selected, 
                        finished: true 
                    });
                } else {
                    this.setState({ prompt: 'You Win!!!!', selected: selected, finished: true });
                }
            }
        };
    }
    getBuckets() {
        const buckets = Array.from({length: 3});
        return (
            <div style={ styles.bucketRow } >
                    { 
                        buckets.map( (val, idx) => {
                            return (<Bucket
                                        left= { 180 * idx }
                                        key={ idx }
                                        ref={ idx } 
                                        onClick={ this.bucketClick(idx).bind(this) }
                                        open={ !this.state.shuffling } 
                                        selected={ this.state.selected === idx } />);
                        })
                    }
            </div>
        );
    }
    getBtnText() {
      if(this.state.started && !this.state.shuffling) {
          return 'Shuffle';
      } else if(this.state.shuffling && this.state.started){
          return 'Shuffling...';
      } else {
          return 'Start a New Game';
      }
    }
    render() {
        return (
            <div style={ styles.container } >
                <h2 style={ styles.title } >React Shell Game</h2>
                <h4 style={ styles.prompt } >{ this.state.prompt }</h4>
                { this.getBuckets() }
                <Button onClick={ this.handleClick.bind(this) }>{ this.getBtnText() }</Button>
            </div>
        );
    }
}