import Image from 'next/image'
import Link from "next/link";
import {getLocalCoins} from "@/utils";
import ChartSmall from "@/components/ChartSmall";

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
        return number.toString();
    }
}

function date(timestamp) {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

const getCoins = async () => {
    const headers = new Headers()
    headers.append('x-access-token', 'coinranking6a945e4fba09a8b24a410d03787b54f2ee68876e3f8197ea')
    const req = new Request("https://api.coinranking.com/v2/coins?timePeriod=24h", {
        method: "GET",
        headers,
    });
    const res = await fetch(req)
    if (!res.ok) throw new Error('Fail to fetch coins')
    return res.json()
}

const CoinsTableHead = () => {
    return (
        <thead className={'sticky top-0 shadow-xl bg-zinc-950 font-light text-xs md:text-md'}>
        <tr className={''}>
            <th className=' px-2 w-8 h-8'>#</th>
            <th className={'sticky left-0 min-w-[8rem] text-left py-2  px-4 bg-zinc-950  font-light'}>Asset</th>
            <th className={'text-left py-2 px-4 font-light'}>Price</th>
            <th className={'text-left py-2 px-4 font-light'}>Market Cap</th>
            <th className={'text-left py-2 px-4 font-light'}>24h Volume</th>
            <th className={'text-left py-2 px-4 font-light'}>24h %</th>
            <th className={'text-left py-2 px-4 font-light'}>24h Chart</th>
            <th className={'text-left py-2 px-4 font-light'}>Listed At</th>
        </tr>
        </thead>
    )
}

const CoinRow = ({coin, i}) => {
    return (
        <tr className={'group border-b border-gray-600 border-solid  cursor-pointer  transition-all duration-300 hover:bg-slate-700 hover:rounded-lg hover:shadow-lg'}>

            <td className={'text-center px-2'}>
                <Link href={`/coin/${coin.uuid}`}
                      className={'flex items-center justify-center bg-gray-700 w-6 h-6 rounded-lg text-xs'}>{i + 1}</Link>

            </td>
            <td className={'min-w-[8rem] bg-zinc-900 group-hover:bg-slate-700 transition-all duration-300 sticky z-0 left-0 py-2 px-4 '}>
                <Link className={' flex items-center gap-4 '} href={`/coin/${coin.uuid}`}>
                    <div className="w-6 h-6">
                        <Image className={'z-0 overflow-auto'} alt={`coin ${coin.name}`} width={24} height={24}
                               src={coin.iconUrl}/>
                    </div>
                    <div className={'flex flex-col'}>
                        <span className={'text-xs font-light md:text-lg'}>{coin.name}</span>
                        <span className={'text-xs text-gray-400'}>{coin.symbol}</span>
                    </div>
                </Link>

            </td>

            <td className={'text-left p-4'}>
                <Link href={`/coin/${coin.uuid}`} className={`text-sm text-blue-500`}>
                   ${Number(coin.price).toFixed(2)}
                </Link>
            </td>
            <td className={'text-left p-4 min-w-[6rem]'}>
                <Link href={`/coin/${coin.uuid}`} className={`text-sm`}>
                    ${short(coin.marketCap)}
                </Link>
            </td>
            <td className={'text-left p-4 min-w-[6rem]'}>
                <Link href={`/coin/${coin.uuid}`} className={`text-sm`}>
                    ${short(coin['24hVolume'])}
                </Link>
            </td>


            <td className={`text-left text-sm p-4 ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <Link href={`/coin/${coin.uuid}`}>
                    <span>{coin.change > 0 ? '↑' : '↓'}</span>
                    {coin.change}%
                </Link>


            </td>

            <td className={'text-left py-1 w-[128px] h-[44px] min-w-[128px] min-h-[44px] py-2 pr-1'}>
                <Link href={`/coin/${coin.uuid}`} className={`text-sm underline text-gray-400  w-[120px] h-[44px] min-w-[120px] min-h-[44px]`}>
                    <ChartSmall data={coin.sparkline} isIncrease={coin.change>0}/>
                </Link>
            </td>

            <td className={'text-left p-4 min-w-[6rem]'}>
                <Link href={`/coin/${coin.uuid}`} className={`text-sm underline text-gray-400`}>
                    {date(coin.listedAt)}
                </Link>
            </td>
        </tr>


    )
}


export default async function Home() {
    const coins = await getCoins()
    return (
        <main className={'h-full overflow-x-scroll  flex flex-col w-full min-h-screen justify-center'}>
            <table className={'w-full max-w-5xl overflow-x-scroll mx-auto shadow-lg mt-4'}>
                <CoinsTableHead/>
                <tbody>
                {
                    coins.data.coins.map((coin, i) => <CoinRow coin={coin} i={i} key={coin.uuid}/>)
                }

                </tbody>

            </table>
        </main>
    )
}
