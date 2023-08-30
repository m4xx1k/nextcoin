import Link from "next/link";
import Image from "next/image";
import ChartSmall from "@/components/ChartSmall";
import {date, price, short} from "@/helpers/utils";
import TableLikeCell from "@/components/TableLikeCell";

const CoinTableRow = ({coin, likes, showLikes,i}) => {
    return (
        <tr className={'group border-b border-gray-300  dark:border-gray-600 border-solid   cursor-pointer  transition-colors duration-500  dark:text-light text-dark hover:bg-gray-300 hover:rounded-lg dark:hover:bg-slate-700'}>
            {Array.isArray(likes) ? <TableLikeCell coin={coin} isLiked={likes.includes(coin.uuid)}/> :(showLikes && <td className={'opacity-0 p-4'}>🤍</td>)}
            <td className={'text-center px-2'}>
                <Link href={`/coin/${coin.uuid}`}
                      className={`flex items-center justify-center bg-gray-300 dark:bg-gray-700 ${i + 1 < 1000 ? 'w-6' : 'w-fit px-0.5'}  h-6 rounded-lg text-xs text-dark dark:text-light`}>
                    {i + 1}
                </Link>

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
                    ${price(coin.price) || ' —'}
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
export default CoinTableRow
