"use client"

import React from 'react';
import LoginButton from './LoginButton';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const AuthButtons = () => {

    const session = useSession();
    // console.log(session);

    //also need to handle loading

    return (
        <div className="flex gap-5">

            {
                session.status === "authenticated"
                    ?
                    <button
                        onClick={() => signOut()}
                        className='btn'>
                        Logout
                    </button>
                    :
                    <>
                        <LoginButton></LoginButton>
                        <Link href={"/register"} className="btn">
                            Register
                        </Link>
                    </>
            }
        </div>
    );
};

export default AuthButtons;