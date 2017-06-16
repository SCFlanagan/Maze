'use strict';

import React from 'react';
import Maze from './Maze.jsx';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            top: 9,
            left: -3
        }
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.whichBox = this.whichBox.bind(this);
        this.findGoodDirections = this.findGoodDirections.bind(this);
    }

    componentDidMount() {
        window.onkeydown = this.keyDownHandler;
        window.onkeyup = this.keyUpHandler;
    }

    render() {
        const squares = 'x'.repeat(56).split('');

        return (
            <div id='container'>
                <Maze id='x' />
                <div id='ball'></div>
            </div>
        );
    }

    keyDownHandler(e) {
        let div = document.getElementById('ball');
        let topNumber = this.state.top;
        let leftNumber = this.state.left;
        let newNumber;

        

        
        let section = this.whichBox();
        console.log('section:', section)
        if (section[0] === 'o') {
            if (e.key === 'ArrowRight') {
                console.log('wggwe')
                newNumber = leftNumber + 1;
                div.style.left = newNumber + 'rem';
                this.setState({left: newNumber});
                return;
            }
        }
        /*let directions = this.findGoodDirections(section);
        let bool;
        if (directions.indexOf(e.key) > -1) {
            bool = true;
        } else {
            bool = false;
        }*/
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
        console.log(this.state.left, this.state.top)
    }

    keyUpHandler() {
        let section = this.whichBox();
        this.findGoodDirections(section);
    }

    whichBox() {
        let x;
        
        if (this.state.left < 0) {
            x = 'outside';
        } else if (0 <= this.state.left && this.state.left < 3) {
            x = '1';
        } else if (4 <= this.state.left && this.state.left < 7) {
            x = '2';
        } else if (8 <= this.state.left && this.state.left < 11) {
            x = '3';
        } else if (12 <= this.state.left && this.state.left < 15) {
            x = '4';
        } else if (6 <= this.state.left && this.state.left < 19) {
            x = '5';
        } else if (20 <= this.state.left && this.state.left < 23) {
            x = '6';
        } else if (24 <= this.state.left && this.state.left < 27) {
            x = '7';
        } else if (28 <= this.state.left && this.state.left < 31) {
            x = '8';
        }

        let y;
        if (0 <= this.state.top && this.state.top < 3) {
            y = 'a';
        } else if (4 <= this.state.top && this.state.top < 7) {
            y = 'b';
        } else if (8 <= this.state.top && this.state.top < 11) {
            y = 'c';
        } else if (12 <= this.state.top && this.state.top < 15) {
            y = 'd';
        } else if (6 <= this.state.top && this.state.top < 19) {
            y = 'e';
        } else if (20 <= this.state.top && this.state.top < 23) {
            y = 'f';
        }

        return x+y;
    }

    // Takes in the section and returns an array of directions that are safe to go in.
    findGoodDirections2(section) {
        if (section === '1a') {
            console.log('right down')
            return ['ArrowRight', 'ArrowDown'];
        } else if (section === '2a') {
            console.log('left')
            return ['ArrowLeft'];
        } else if (section === '3a' || section === '4a' || section === '5a' || section === '6a' || section === '7a') {
            console.log('?right')
            return ['ArrowRight'];
        } else if (section === '1b' || '1c' || '2e') {
            console.log('up right down')
            return ['ArrowUp', 'ArrowRight', 'ArrowDown'];
        } else if (section === '8a' || '7b' || '3c') {
            console.log('down')
            return ['ArrowDown'];
        } else if (section === '2b' || '3b' || '4b' || '5b' || '6b' || '3c' || '4e' || '7e' || '3f' || '4f' || '6f' || '7f') {
            console.log('ArrowLeft ArrowRight')
            return ['left', 'right'];
        } else if (section === '8b' || '7c' || '8c' || '1d' || '2d' || '6d' || '8d' || '9e') {
            console.log('up down')
            return ['ArrowUp', 'ArrowDown'];
        } else if (section === '2c') {
            console.log('left right down')
                return ['ArrowLeft', 'ArrowRight', 'ArrowDown'];
        } else if (section === '4c' || '6c' || '5e') {
            console.log('left down')
            return ['ArrowLeft', 'ArrowDown'];
        } else if (section === '5c') {
            console.log('right down')
            return ['ArrowRight', 'ArrowDown'];
        } else if (section === '4d' || '6e' || '2f' || '5f') {
            console.log('up right')
            return ['ArrowUp', 'ArrowRight'];
        }  else if (section === '5d' || '8f') {
            console.log('up left')
            return ['ArrowUp', 'ArrowLeft'];
        } else if (section === '7d' || '1f') {
            console.log('up')
            return ['ArrowUp'];
        } else if (section === '3e') {
            console.log('left right up')
            return ['ArrowLeft', 'ArrowRight', 'ArrowUp'];
        } else if (section === '8e') {
            console.log('up left down')
            return ['ArrowUp', 'ArrowLeft', 'ArrowDown'];
        }
    }

    findGoodDirections(key) {
        let y = this.state.top;
        let x = this.state.left;

        if (key === 'ArrowUp') {
            if (y - 1 < 0) {
                return false;
            } else {
                return true;
            }
        }
        if (key === 'ArrowRight' || key === 'ArrowLeft') {
            let add;
            if (key === 'ArrowRight') {
                add = 1;
            } else {
                add = -1;
            }
            console.log('add!!!!', add)

            if (x + add === 3) {
                if (y > 10 || y === 7 || y === 3) {
                    return false;
                } else {
                    return true;
                }
            }
            if (x + add === 7) {
                if (y >= 0 && y < 2) {
                    return false
                }
                if (y > 10 && y < 16) {
                    return false
                }
                if (y === 19) {
                    return false;
                } else {
                    return true;
                }
            }
            if (x + add === 15) {
                if (y < 12 && y > 7) {
                    return false;
                } else {
                    return true;
                }
            }
            if (x + add === 19) {
                if (y > 10 && y < 20) {
                    return false;
                } else {
                    return true;
                }
            }
            if (x + add === 23) {
                if (y > 7 && y < 16) {
                    return false;
                } else {
                    return true;
                }
            }
            if (x + add === 27) {
                if (y > 2 && y < 16) {
                    return false;
                }
                if (y === 19) {
                    return false;
                } else {
                    return true;
                }
            }
            if (x + add === 31) {
                if (y === 6 || y === 7 || y === 8) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        if (key === 'ArrowDown') {
            if (y + 1 > 22) {
                return false;
            } else {
                return true;
            }
        }
        if (key === 'ArrowLeft') {
            
        }
    }
}
/*
0, 0 through 0, 22
0, 0 through 30, 0
0, 22 through 22, 30
30, 0 through 22, 30*/