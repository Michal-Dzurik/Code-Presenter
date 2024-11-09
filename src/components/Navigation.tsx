import * as React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

export const Navigation = (): React.ReactElement => {
    const { user, logIn, logOut, isLoggedIn } = useAuth();

    return (
        <div className="navbar bg-base-200 fixed">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Code Presenter
                </Link>
            </div>

            {isLoggedIn() ? (
                <div className="dropdown dropdown-end mr-4">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user && user.photoURL ? user.photoURL : ''}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to={'editor/'}>Editor</Link>
                        </li>
                        <li>
                            <Link to={'my-codes/'}>My codes</Link>
                        </li>
                        <li>
                            <a onClick={logOut}>Logout</a>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="navbar-center lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <button
                                onClick={logIn}
                                type="button"
                                className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                            >
                                <svg
                                    className="mr-2 -ml-1 w-4 h-4"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fab"
                                    data-icon="google"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 488 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                    ></path>
                                </svg>
                                Sign in with Google
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
