import Image from 'next/image';


const Footer = () => {

    const year = new Date().getFullYear();
    return (
        <footer className="bg-card-foreground w-full shadow m-0">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://nsanzimfura.web.app/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Image src="/logo.svg" className="h-8" alt="File Uploader Logo"
                            width={60}
                            height={80}
                        />
                        <span className="self-center text-2xl font-bold whitespace-nowrap text-white">File Uploader</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Filter Files</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Manage Files</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Customize Files</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Filter Files</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-white sm:text-center">© {year} <a href="https://nsanzimfura.web.app/" className="hover:underline">File Uploader™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;