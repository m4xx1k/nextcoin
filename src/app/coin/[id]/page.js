import React from 'react';
import ChartLarge from "@/components/ChartLarge";
import Image from 'next/image'
import CoinLinks from '@/components/CoinLinks';
import coinService from '@/services/coin'
import CoinPageLike from "@/components/CoinPageLike";
import {price} from "@/helpers/utils";

const Page = async ({params: {id}}) => {
    const {data} = await coinService.getCoin(id)

    return (
		<main className='flex flex-col gap-4 max-w-screen px-1 md:max-w-5xl mt-8 mx-auto'>
			<div className='w-full flex items-center justify-between flex-wrap px-2'>
				<div className='flex items-center gap-4'>
					<Image src={data.coin.iconUrl} width={64} height={64} alt={data.coin.name}/>
					<div>
						<div className='flex gap-2'>
							<CoinPageLike coin={data.coin}/>
							<h1 className={'text-2xl font-bold'}>{data.coin.name}</h1>
							<h2 className={'text-sm text-gray-600 '}>{data.coin.symbol}</h2>
						</div>
						<div className='flex items-center gap-1'>
							{data.coin.tags.map(tag=><div className='px-2 py-0.5 bg-gray-300 dark:bg-gray-800 w-fit text-xs capitalize rounded-lg' key={tag}>{tag.replaceAll('-',' ')}</div>)}
						</div>
					</div>
				</div>
				<CoinLinks links={data.coin.links}/>

			</div>

			<div className="flex items-center gap-8 w-full flex-wrap justify-center lg:justify-start">
				<div className='flex items-center gap-4 ml-4'>
					<span className='text-gray-700 dark:text-gray-300 text-3xl font-bold'>$ {price(data.coin.price)}</span>
					<span className={`${data.coin.change>0 ? 'text-green-500' : 'text-red-500'}`}>
						{data.coin.change>0 ?  '↑' : '↓'}{data.coin.change}%
					</span>
				</div>
				<div className='flex flex-col '>
					<span className='text-gray-400 text-xs'>24h Volume: </span>
					<span className='lg:text-lg font-bold'>{Number(data.coin['24hVolume']).toLocaleString()} USDT</span>
				</div>
				<div className='flex flex-col '>
					<span className='text-gray-400 text-xs'>Market Cap: </span>
					<span className='lg:text-lg font-bold'>{Number(data.coin['marketCap']).toLocaleString()} USDT</span>
				</div>
			</div>
			<div className={'px-4'}>
				<h2 className={'text-xl font-medium'}>Description: </h2>
				<p className={'tracking-wider font-light'}>{data.coin.description}</p>

			</div>
			<div className={'px-4'}>
				<h2 className={'text-xl font-medium mb-2'}>Chart:</h2>
				<div className={'w-full h-[200px]'}>
					<ChartLarge data={data.coin.sparkline}  symbol={data.coin.symbol}/>
				</div>
			</div>

		</main>


    );
};

export default Page;
