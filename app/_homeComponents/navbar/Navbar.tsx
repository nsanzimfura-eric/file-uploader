'use client'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image'
import { useState } from 'react';

const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Manage Files', href: '#', current: false },
    { name: 'Customize Files', href: '#', current: false },
    { name: 'Filter Files', href: '#', current: false },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

interface NavbarProps { }

const Navbar = (props: NavbarProps) => {
    const { } = props;
    const [open, setOpen] = useState(true);

    const handleToggleNav = () => {
        setOpen(prev => !prev);
    }

    return (
        <main className="bg-bgNav">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open menu</span>
                            {open ? (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={handleToggleNav} />
                            ) : (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" onClick={handleToggleNav} />
                            )}
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <Image
                                className="h-8 w-auto"
                                src="/logo.svg"
                                alt="File Uploader"
                                width={40}
                                height={60}
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block sm:ms-auto">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? ' text-white' : 'text-gray-700 hover:text-primary',
                                            'rounded-md px-3 py-2 text-sm font-bold'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Navbar;