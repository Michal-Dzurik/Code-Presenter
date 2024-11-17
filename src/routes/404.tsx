import * as React from 'react';
import '../index.css';

export const NotFound = (): React.ReactElement => {
    return (
        <div className="flex content-center justify-center items-center h-screen flex-col">
            <h3 id='404' className="text-6xl text-white">4😕4</h3>
            <p>Sorry, this route doesn't exist</p>
        </div>
    );
};
