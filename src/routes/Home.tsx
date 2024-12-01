import * as React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

export const Home = (): React.ReactElement => {
    return (
        <>
            <div className="hero min-h-screen">
                <div className="hero-content text-center">
                    <div className="">
                        <h1
                            className="text-5xl font-bold max-w-xxl"
                            data-testid="home-heading"
                        >
                            Welcome in Code Presenter
                        </h1>
                        <p className="py-6 max-w-md m-auto">
                            The best way to gift a digital goods!
                        </p>
                        <Link to="/editor" className="btn btn-primary">
                            Let's do it!
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
