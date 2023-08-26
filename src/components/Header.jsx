'use client'
import {useSession, signIn, signOut} from "next-auth/react";
import Link from 'next/link'
import Image from 'next/image'
import ThemeModeToggle from "@/components/ThemeModeToggle";

const Header = () => {
    const {data: session, status} = useSession()
    console.log({session, status})
    return (
        <div className={'w-full bg-light dark:bg-dark'}>
            <div className={'h-16 w-full max-w-5xl mx-auto flex items-center justify-between px-2'}>
                <div className={'flex flex-col'}>
                    <Link href='/' className={'text-lg light tracking-widest'}>NEXT | Coins</Link>
                    <span className={'text-xs text-gray-400'}>by <a className={'underline'}
                                                                    href="https://github.com/m4xx1k">m4xx1k</a></span>
                </div>
                <div className={'flex items-center gap-2'}>
                    {
                        status === 'authenticated' ?
                            <Image onClick={signOut} className={'cursor-pointer rounded-full'} src={session.user.image} width={32} height={32}
                                   alt={session.user.name}/> : <></>
                    }
                    {status === 'unauthenticated' ?
                        <span onClick={() => signIn('google')} className={'cursor-pointer underline'}>Sing In</span>
                        : <></>
                    }
                    <ThemeModeToggle/>

                </div>

            </div>
        </div>
    );
};

export default Header;
