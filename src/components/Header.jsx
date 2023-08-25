import Link from 'next/link'
const Header = () => {
    return (
        <div className={'w-full bg-zinc-950'}>
            <div className={'h-16 w-full max-w-5xl mx-auto  flex items-center px-2'}><div className={'flex flex-col'}>
                <Link href='/' className={'text-lg light tracking-widest'}>NEXT | Crypto</Link>
                <span className={'text-xs text-gray-400'}>by <a className={'underline'} href="https://github.com/m4xx1k">m4xx1k</a></span>
            </div></div>


        </div>
    );
};

export default Header;
