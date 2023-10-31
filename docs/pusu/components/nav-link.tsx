import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';

const NavLink: React.FC<{
    children: React.ReactNode;
    href: string;
    className?: string;
}> = ({ children, href, className }) => {
    const router = useRouter();
    const refLink = useRef<HTMLAnchorElement>(null);
    const hash: string | undefined = router.asPath.split('#')[1];

    useEffect(() => {
        if (refLink.current) {
            const className = refLink.current.className.split(' ').filter((it) => it !== 'text-gray-800' && it !== 'dark:text-gray-300').join(' ');

            if ((router.pathname.toLowerCase() === href.toLowerCase() || `${router.pathname.toLowerCase()}#${hash?.toLowerCase()}` === href.toLowerCase())) {
                refLink.current.setAttribute('class', className);
            } else {
                refLink.current.setAttribute('class', [className, 'text-gray-800', 'dark:text-gray-300'].join(' '));
            }
        }
    }, [router.pathname, hash, href]);

    return (
        <Link
            ref={refLink}
            href={href}
            className={className}
        >
            {children}
        </Link>
    );
};

export default NavLink;
