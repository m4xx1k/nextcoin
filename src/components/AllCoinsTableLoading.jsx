export const CoinTableRowLoading = () => {
    return <tr
        className={'group animate-pulse bg-gray-300 dark:bg-dark border-b border-gray-400  dark:border-gray-600 border-solid   cursor-pointer  transition-colors duration-500  dark:text-light text-dark'}>

        <td className={'text-center px-2'}>
            <div
                className={`flex items-center justify-center  h-6 rounded-lg text-xs text-dark dark:text-light`}>
            </div>

        </td>
        <td className={'text-center px-2'}>
            <div
                className={`flex items-center justify-center 
							h-6 rounded-lg text-xs text-dark dark:text-light`}>
            </div>

        </td>
        <td className={'sticky left-0 z-0 py-2 px-4 transition-colors duration-500 min-w-[8rem] bg-gray-300 dark:bg-dark '}>
            <div className={' flex items-center gap-4 '}>
                <div className="w-6 h-6">

                </div>
                <div className={'flex flex-col  transition-colors duration-200 '}>
                    <span className={'text-xs font-light md:text-lg'}></span>
                    <span className={'text-xs text-gray-400'}></span>
                </div>
            </div>

        </td>
        <td className={'text-left p-4'}>
            <div className={`text-sm text-blue-500`}>
            </div>
        </td>
        <td className={'text-left p-4 min-w-[6rem]'}>
            <div className={`text-sm`}>
            </div>
        </td>
        <td className={'text-left p-4 min-w-[6rem]'}>
            <div className={`text-sm`}>
            </div>
        </td>
        <td className={`text-left text-sm p-4  `}>
            <div>
            </div>


        </td>
        <td className={'text-left py-2 w-[128px] h-[44px] min-w-[128px] min-h-[44px] pr-1'}>
            <div
                className={`text-sm underline text-gray-400  w-[120px] h-[44px] min-w-[120px] min-h-[44px]`}>
            </div>
        </td>
        <td className={'text-left p-4 min-w-[6rem]'}>
            <div className={`text-sm underline text-gray-400`}>

            </div>
        </td>

    </tr>
}

const AllCoinsTableLoading = ({limit = 50}) => {
    return (
        <table className={'w-full max-w-screen lg:max-w-5xl overflow-x-scroll shadow-lg mt-1'}>
            <thead className={'sticky top-0 bg-zinc-200 dark:bg-zinc-900 font-light text-xs md:text-md'}>
            <tr>
                <th className='px-2 w-8 h-8 text-sm'>💖</th>
                <th className='px-2 w-8 h-8'>#</th>
                <th className={'sticky left-0 min-w-[8rem] text-left py-2 px-4 bg-zinc-200 dark:bg-zinc-900 font-light'}>Asset</th>
                <th className={'text-left py-2 px-4 font-light min-w-[8rem]'}>Price</th>
                <th className={'text-left py-2 px-4 font-light min-w-[8rem]'}>MarketCap</th>
                <th className={'text-left py-2 px-4 font-light min-w-[8rem]'}>24h Volume</th>
                <th className={'text-left py-2 px-4 font-light min-w-[8rem]'}>24h%</th>
                <th className={'text-left py-2 px-4 font-light min-w-[8rem]'}>24h Chart</th>
                <th className={'text-left py-2 px-4 font-light min-w-[8rem]'}>Listed At</th>
            </tr>
            </thead>
            <tbody className={'h-full responsive pb-8'}>
            {Array(limit).fill('').map((_, i) => <CoinTableRowLoading key={i}/>
            )}
            </tbody>
        </table>
    )
}

export default AllCoinsTableLoading
