'use strict';

import React from 'react';
import Maze from './Maze.jsx';
import { Button } from 'react-bootstrap';

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            top: 9,
            left: -1,
            on: true
        }

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.findGoodDirections = this.findGoodDirections.bind(this);
    }

    componentDidMount() {
        window.onkeydown = this.keyDownHandler;
        window.onkeyup = this.keyUpHandler;
    }

    componentDidUpdate() {
        if (this.state.left === 32) {
            console.log('here')
            alert('You won!');
            this.setState({on: false, left: 33});
        }
    }

    render() {
        const squares = 'x'.repeat(56).split('');

        return (
                <div id='container'>
                    <Maze id='x' />
                    <div id='ball'></div>
                    {!this.state.on ? <Button bsStyle='info' onClick={() => window.location.reload()}>Play Again</Button> : null}
                </div>

        );
    }

    keyDownHandler(e) {
        if (this.state.on) {
            let div = document.getElementById('ball');
            let topNumber = this.state.top;
            let leftNumber = this.state.left;
            let newNumber;

            if (this.state.left < 0) {
                if (e.key === 'ArrowRight') {
                    newNumber = leftNumber + 1;
                    div.style.left = newNumber + 'rem';
                    this.setState({left: newNumber});
                    return;
                }
            }

            let bool = this.findGoodDirections(e.key);
            if (bool) {
                if (e.key === 'ArrowUp') {
                    newNumber = topNumber - 1;
                    div.style.top = newNumber + 'rem';
                    this.setState({top: newNumber});
                }
                if (e.key === 'ArrowRight') {
                    newNumber = leftNumber + 1;
                    div.style.left = newNumber + 'rem';
                    this.setState({left: newNumber});
                }        
                if (e.key === 'ArrowDown') {
                    newNumber = topNumber + 1;
                    div.style.top = newNumber + 'rem';
                    this.setState({top: newNumber});
                }
                if (e.key === 'ArrowLeft') {
                    newNumber = leftNumber - 1;
                    div.style.left = newNumber + 'rem';
                    this.setState({left: newNumber});
                }
            }
        }
    }

    findGoodDirections(key) {
        let y = this.state.top;
        let x = this.state.left;
        let add;
        
        if (key === 'ArrowRight' || key === 'ArrowLeft') {
            add;
            if (key === 'ArrowRight') {
                add = 1;
            } else {
                add = -1;
            }

            if (x + add === 3) {
                if (y > 10 || y === 7 || y === 3) {
                    return false;
                }
            }
            if (x + add === 7) {
                if (y >= 0 && y < 3) {
                    return false
                }
                if (y > 10 && y < 16) {
                    return false
                }
                if (y === 19) {
                    return false;
                }
            }
            if (x + add === 15) {
                if (y < 12 && y > 7) {
                    return false;
                }
            }
            if (x + add === 19) {
                if (y > 10 && y < 20) {
                    return false;
                }
            }
            if (x + add === 23) {
                if (y > 7 && y < 16) {
                    return false;
                }
            }
            if (x + add === 27) {
                if (y > 2 && y < 16) {
                    return false;
                }
                if (y === 19) {
                    return false;
                }
            }
            if (x + add === 31) {
                if (y === 4 || y === 5 || y === 6) {
                    return true;
                } else {
                    return false;
                }
            }
            if (x + add === 11) {
                if (y > 10 && y < 16) {
                    return false;
                }
            }
            if (x + add === -1) {
                return false;
            } else {
                return true;
            }
        }
        if (key === 'ArrowUp' || key === 'ArrowDown') {
            add;
            if (key === 'ArrowDown') {
                add = 1;
            } else {
                add = -1;
            }
            if (y + add === 3) {
                if (x > 2 && x < 28) {
                    return false;
                }
            }
            if (y + add === 19) {
                if (x > 6 && x < 16) {
                    return false;
                }
                if (x > 18 && x < 28) {
                    return false;
                }
            }
            if (y + add === 7) {
                if (x > 2 && x <= 24) {
                    return false;
                } 
            }
            if (y + add === 15) {
                if (x > 22 && x < 28) {
                    return false;
                }
                if (x > 10 && x < 20) {
                    return false;
                }
                if (x === 7) {
                    return false;
                }
            }
            if (y + add === 11) {
                if (x > 6 && x < 11) {
                    return false;
                }
                if (x === 15 || x === 19) {
                    return false;
                }
            }
            if (y + add < 0) {
                return false;
            }
            if (y + add > 22) {
                return false;
            } else {
                return true;
            }
        }
            return true;
    }
}