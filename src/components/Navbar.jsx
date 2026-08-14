import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='flex justify-center items-center py-4 space-x-6 border-b-2 text-2xl'>
            <Link href="/">Home</Link>
            <Link href="/public">Public</Link>
            <Link href="/private">Private</Link>
            <Link href="/admin">Admin</Link>
        </div>
    );
};

export default Navbar;