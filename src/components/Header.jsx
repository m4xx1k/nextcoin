import Link from 'next/link'
import ThemeModeToggle from "@/components/ThemeModeToggle";
const Header = () => {
    return (
        <div className={'w-full bg-light dark:bg-dark'}>
            <div className={'h-16 w-full max-w-5xl mx-auto  flex items-center justify-between px-2'}>
                <div className={'flex flex-col'}>
                    <Link href='/' className={'text-lg light tracking-widest'}>NEXT | Coins</Link>
                    <span className={'text-xs text-gray-400'}>by <a className={'underline'} href="https://github.com/m4xx1k">m4xx1k</a></span>
                </div>
                <ThemeModeToggle/>

            </div>
        </div>
    );
};

export default Header;
