'use client'
import {useSession} from "next-auth/react";

const MainPageDescription = () => {
    const {data:session} = useSession()
    return (
        <p className={'max-w-5xl mx-auto my-2 font-light tracking-wider text-sm first-letter:ml-1 first-letter:text-lg px-1'}>
            Hello{session ? ` ${session.user.name}`:''}, at NextCoins, we understand that the world of cryptocurrencies can be both exhilarating and
            overwhelming. That&apos;s why we&apos;ve created a platform that provides you with a comprehensive yet user-friendly
            interface to explore and analyze various cryptocurrencies and their associated data. Whether you&apos;re a
            seasoned crypto trader, a curious investor, or someone just getting started, NextCoins has something to
            offer for everyone!
        </p>
    );
};

export default MainPageDescription;
