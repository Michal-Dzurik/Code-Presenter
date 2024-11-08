import * as React from "react";
import "../index.css";
import {Link} from "react-router-dom";


export const Home = (): React.ReactElement => {
    return (
        <>

            <div className="hero min-h-screen">
                <div className="hero-content text-center">
                    <div className="">
                        <h1 className="text-5xl font-bold max-w-xxl">Welcome in Code Presenter</h1>
                        <p className="py-6 max-w-md m-auto">
                            This is the best way to present gift, discount, steam or any kind of code to your loved
                            ones. You can choose from various of styles.
                        </p>
                        <Link to='/editor' className="btn btn-primary">Let's do it!</Link>
                    </div>
                </div>
            </div>
        </>

    );
}
