import Image from 'next/image'
import Link from "next/link";
import ChartSmall from "@/components/ChartSmall";
import MainPageDescription from "@/components/MainPageDescription";
import coinService from '@/services/coin'
import AllCoinsTable from "@/components/AllCoinsTable";

const short = number => {
    if (number >= 1e12) {
        return (number / 1e9).toFixed(2) + ' T';
    } else if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + ' B';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + ' M';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + ' K';
    } else {
        return number?.toString() || number;
    }
}

const date = timestamp => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}


export const SimpleCoinsTableHead = () => {
    return (
        <thead className={'sticky top-0 bg-zinc-200 dark:bg-zinc-900 font-light text-xs md:text-md'}>
        <tr className={''}>
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

export const CoinRow = ({coin, i}) => {

    const price = () => {
        const price = Number(coin.price)
        if (price > 10000) return price.toFixed(2)
        else if (price > 1000) return price.toFixed(4)
        else if (price > 1) return price.toFixed(6)
        return price.toFixed(8)
    }

    return (
        <tr className={'group border-b border-gray-300  dark:border-gray-600 border-solid   cursor-pointer  transition-colors duration-500  dark:text-light text-dark hover:bg-gray-300 hover:rounded-lg dark:hover:bg-slate-700'}>

            <td className={'text-center px-2'}>
                <Link href={`/coin/${coin.uuid}`}
                      className={`flex items-center justify-center bg-gray-300 dark:bg-gray-700 ${i+1<1000 ? 'w-6':'w-fit px-0.5'}  h-6 rounded-lg text-xs text-dark dark:text-light`}>{i + 1}</Link>

            </td>
            <td className={'sticky left-0 z-0 py-2 px-4 transition-colors duration-500 min-w-[8rem] bg-light dark:bg-dark group-hover:bg-gray-300 dark:group-hover:bg-slate-700'}>
                <Link className={' flex items-center gap-4 '} href={`/coin/${coin.uuid}`}>
                    <div className="w-6 h-6">
                        <Image className={'z-0 overflow-auto'} alt={`coin ${coin.name}`} width={24} height={24}
                               src={coin.iconUrl}/>
                    </div>
                    <div className={'flex flex-col  transition-colors duration-200 '}>
                        <span className={'text-xs font-light md:text-lg'}>{coin.name}</span>
                        <span className={'text-xs text-gray-400'}>{coin.symbol}</span>
                    </div>
                </Link>

            </td>

            <td className={'text-left p-4'}>
                <Link href={`/coin/${coin.uuid}`} className={`text-sm text-blue-500`}>
                    ${price() || ' —'}
                </Link>
            </td>
            <td className={'text-left p-4 min-w-[6rem]'}>
                <Link href={`/coin/${coin.uuid}`} className={`text-sm`}>
                    ${short(coin.marketCap) || ' —'}
                </Link>
            </td>
            <td className={'text-left p-4 min-w-[6rem]'}>
                <Link href={`/coin/${coin.uuid}`} className={`text-sm`}>
                    ${short(coin['24hVolume']) || ' —'}
                </Link>
            </td>


            <td className={`text-left text-sm p-4 ${coin.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                <Link href={`/coin/${coin.uuid}`}>
                    <span>{coin.change > 0 ? '↑' : '↓'}</span>
                    {coin.change}%
                </Link>


            </td>
            {
                coin?.sparkline &&


                <td className={'text-left py-1 w-[128px] h-[44px] min-w-[128px] min-h-[44px] py-2 pr-1'}>
                    <Link href={`/coin/${coin.uuid}`}
                          className={`text-sm underline text-gray-400  w-[120px] h-[44px] min-w-[120px] min-h-[44px]`}>
                        <ChartSmall data={coin.sparkline} isIncrease={coin.change > 0}/>
                    </Link>
                </td>
            }
            <td className={'text-left p-4 min-w-[6rem]'}>
                <Link href={`/coin/${coin.uuid}`} className={`text-sm underline text-gray-400`}>
                    {date(coin.listedAt)}
                </Link>
            </td>
        </tr>


    )
}

const RunningLine = ({stats}) => {
    return (
        <div className={'w-full max-w-screen bg-zinc-400 dark:bg-zinc-800 overflow-x-hidden'}>
            <div className={'min-w-0 w-screen lg:max-w-5xl mx-auto'}>
                <div className={'cursor-default whitespace-nowrap text-xs font-medium w-full'}>
                    <div className={'overflow-x-hidden flex'}>
                        <div className={'animate-running lg:animate-none '}>
                            <div className="flex items-center h-10">

                                <div className={'mx-2 w-full'}>
                                    <span className={'mr-1 font-semibold capitalize text-gray-900 dark:text-gray-300'}>Total Coins:</span>
                                    <span>{short(stats.totalCoins)}</span>
                                </div>

                                <div className={'mx-2 w-full'}>
                                    <span className={'mr-1 font-semibold capitalize text-gray-900 dark:text-gray-300'}>Total Markets:</span>
                                    <span className={'font-bold'}>{short(stats.totalMarkets)}</span>
                                </div>

                                <div className={'mx-2 w-full'}>
                                    <span className={'mr-1 font-semibold capitalize text-gray-900 dark:text-gray-300'}>Total Exchanges:</span>
                                    <span className={'font-bold'}>{short(stats.totalExchanges)}</span>
                                </div>

                                <div className={'mx-2 w-full'}>
                                    <span className={'mr-1 font-semibold capitalize text-gray-900 dark:text-gray-300'}>Total Market Cap:</span>
                                    <span className={'font-bold'}>{short(stats.totalMarketCap)}</span>
                                </div>

                                <div className={'mx-2 w-full'}>
                                    <span className={'mr-1 font-semibold capitalize text-gray-900 dark:text-gray-300'}>Total 24h Volume:</span>
                                    <span className={'font-bold'}>{short(stats.total24hVolume)}</span>
                                </div>

                            </div>
                        </div>
                        <div className={'animate-running lg:animate-none lg:hidden'}>
                            <div className="flex items-center h-10">

                                <div className={'mx-2 w-full'}>
                                    <span className={'mr-1 font-semibold capitalize text-gray-900 dark:text-gray-300'}>Total Coins:</span>
                                    <span>{short(stats.totalCoins)}</span>
                                </div>

                                <div className={'mx-2 w-full'}>
                                    <span className={'mr-1 font-semibold capitalize text-gray-900 dark:text-gray-300'}>Total Markets:</span>
                                    <span className={'font-bold'}>{short(stats.totalMarkets)}</span>
                                </div>

                                <div className={'mx-2 w-full'}>
                                    <span className={'mr-1 font-semibold capitalize text-gray-900 dark:text-gray-300'}>Total Exchanges:</span>
                                    <span className={'font-bold'}>{short(stats.totalExchanges)}</span>
                                </div>

                                <div className={'mx-2 w-full'}>
                                    <span className={'mr-1 font-semibold capitalize text-gray-900 dark:text-gray-300'}>Total Market Cap:</span>
                                    <span className={'font-bold'}>{short(stats.totalMarketCap)}</span>
                                </div>

                                <div className={'mx-2 w-full'}>
                                    <span className={'mr-1 font-semibold capitalize text-gray-900 dark:text-gray-300'}>Total 24h Volume:</span>
                                    <span className={'font-bold'}>{short(stats.total24hVolume)}</span>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
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
                <table className={'w-full max-w-screen lg:max-w-5xl overflow-x-scroll shadow-lg mt-1'}>
                    <SimpleCoinsTableHead/>
                    <tbody className={'h-full responsive pb-8'}>
                    {
                        stats.best.map((coin, i) => <CoinRow coin={coin} i={i} key={coin.uuid}/>)
                    }


                    </tbody>
                </table>
                <h2 className={'sticky left-0 text-xl mt-4 font-medium'}>Newest Coins</h2>
                <table className={'w-full max-w-screen lg:max-w-5xl overflow-x-scroll shadow-lg mt-1'}>
                    <SimpleCoinsTableHead/>
                    <tbody className={'h-full responsive pb-8'}>
                    {
                        stats.newest.map((coin, i) => <CoinRow coin={coin} i={i} key={coin.uuid}/>)
                    }


                    </tbody>
                </table>
                <AllCoinsTable/>
            </main>
        </>
    )
}
