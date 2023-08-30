import MainPageDescription from "@/components/MainPageDescription";
import coinService from '@/services/coin.service'
import AllCoinsTable from "@/components/AllCoinsTable";
import CoinTableRow from "@/components/CoinTableRow";
import RunningLine from "@/components/RunningLine";


export const SimpleCoinsTableHead = () => {
    return (
        <thead className={'sticky top-0 bg-zinc-200 dark:bg-zinc-900 font-light text-xs md:text-md'}>
        <tr className={''}>
            {/*<th className='px-2 w-8 h-8 text-sm'>💖</th>*/}
            <th className='px-2 w-8 h-8'>#</th>
            <th className={'sticky left-0 min-w-[8rem] text-left py-2  px-4 bg-zinc-200 dark:bg-zinc-900 font-light'}>Asset</th>
            <th className={'text-left py-2 px-4 font-light  min-w-[8rem]'}>Price</th>
            <th className={'text-left py-2 px-4 font-light min-w-[8rem]'}>Market Cap</th>
            <th className={'text-left py-2 px-4 font-light min-w-[8rem]'}>24h Volume</th>
            <th className={'text-left py-2 px-4 font-light min-w-[8rem]'}>24h %</th>
            <th className={'text-left py-2 px-4 font-light min-w-[8rem]'}>24h Chart</th>
            <th className={'text-left py-2 px-4 font-light min-w-[8rem]'}>Listed At</th>
        </tr>
        </thead>
    )
}


export default async function Home() {
    const stats = await coinService.getStats()
    return (
        <>
            <RunningLine stats={stats.data}/>
            <MainPageDescription/>
            <main
                className={'h-full flex flex-col w-full min-h-screen justify-center max-w-screen lg:max-w-5xl mx-auto overflow-x-scroll'}>

                <h2 className={'sticky left-0 text-xl mt-4 font-medium'}>Best Coins</h2>
                <table className={'sticky left-0 w-full max-w-screen lg:max-w-5xl overflow-x-scroll shadow-lg mt-1'}>
                    <SimpleCoinsTableHead/>
                    <tbody className={'h-full responsive pb-8'}>
                    {
                        stats.best.map((coin, i) => <CoinTableRow coin={coin} i={i} key={coin.uuid}/>)
                    }


                    </tbody>
                </table>

                <h2 className={'sticky left-0 text-xl mt-4 font-medium'}>Newest Coins</h2>
                <table className={'sticky left-0 w-full max-w-screen lg:max-w-5xl overflow-x-scroll shadow-lg mt-1'}>
                    <SimpleCoinsTableHead/>
                    <tbody className={'h-full responsive pb-8'}>
                    {
                        stats.newest.map((coin, i) => <CoinTableRow coin={coin} i={i} key={coin.uuid}/>)
                    }


                    </tbody>
                </table>

                <AllCoinsTable/>
            </main>
        </>
    )
}
