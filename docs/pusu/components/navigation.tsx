import NavLink from '@/components/nav-link';
import Link from 'next/link';
import React from 'react';

const Navigation: React.FC = () => {
    return (
        <div className="p-4" style={{ height: '100vh', width: '280px' }}>
            <Link className="text-current" href="/">
                <div className="flex flex-row">
                    <div className="mb-6 text-2xl font-bold leading-none">pusu</div>
                </div>
            </Link>
            <nav className="flex flex-col gap-1">
                <NavLink href="/#installation">Installation</NavLink>
                <NavLink href="/#create-publication">Create Publication</NavLink>
                <NavLink href="/#publish">Publish</NavLink>
                <NavLink href="/#subscribe">Subscribe</NavLink>
                <div className="mt-4 text-neutral-500 dark:text-neutral-500 uppercase">Scenarios</div>
                <NavLink href="/#events">Events</NavLink>
                <NavLink href="/#refresh">Refresh</NavLink>
                <NavLink href="/#store">Store</NavLink>
            </nav>
        </div>
    );
};

export default Navigation;
