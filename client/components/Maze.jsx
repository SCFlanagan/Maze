'use strict'

import React from 'react'

export default class Maze extends React.Component {
    constructor() {
        super();
    }


    render() {
        const squares = 'x'.repeat(48).split('');
        return (
            <div id='outer'>
                <div id='first' className='blackout'></div>
                <div id='second' className='blackout'></div>
                <div id='maze'>
                    {squares.map((elem, key) => {
                        return (
                            <div key={key} id={'s' + key} className='square'></div>
                        );
                    })}
                </div>
            </div>
        );
    }
}