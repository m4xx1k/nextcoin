import React from 'react';
import ChartLarge from "@/components/ChartLarge";
import Image from 'next/image'
import Link from "next/link";
import CoinLinks from '@/components/CoinLinks';

const getData = async id => {
    const headers = new Headers()
    headers.append('x-access-token', 'coinranking6a945e4fba09a8b24a410d03787b54f2ee68876e3f8197ea')
    const req = new Request(`https://api.coinranking.com/v2/coin/${id}?timePeriod=24h`, {
        method: "GET",
        headers,
    });
    const res = await fetch(req)
    if (!res.ok) throw new Error('Fail to fetch coins')
    return res.json()
}
const Page = async ({params: {id}}) => {
    const {data} = await getData(id)

    return (
		<main className='max-w-screen px-1 md:max-w-5xl mt-8 mx-auto'>
			<div className='w-full flex items-center justify-between flex-wrap px-2'>
				<div className='flex items-center gap-4'>
					<Image src={data.coin.iconUrl} width={64} height={64} alt={data.coin.name}/>
					<div>
						<div className='flex  gap-2'>
							<h1 className={'text-2xl font-bold'}>{data.coin.name}</h1>
							<h2 className={'text-sm text-gray-600 '}>{data.coin.symbol}</h2>
						</div>
						<div className='flex items-center gap-1'>
							{data.coin.tags.map(tag=><div className='px-2 py-0.5 bg-gray-800 w-fit text-xs capitalize rounded-lg' key={tag}>{tag.replaceAll('-',' ')}</div>)}
						</div>
					</div>
				</div>
				<CoinLinks links={data.coin.links}/>

			</div>
		<div className='flex items-center gap-4 ml-4'>
			<span className='text-gray-300 text-3xl font-bold'>$ {Number(data.coin.price).toLocaleString()}</span>
			<span className={`${data.coin.change>0 ? 'text-green-500' : 'text-red-500'}`}>
				{data.coin.change>0 ?  '↑' : '↓'}{data.coin.change}%
			</span>
		</div>
			<div className='w-fit flex items-center gap-4'>
				<span className='font-bold text-lg'>24h Volume: </span>
			<span className='text-blue-600 text-lg'>{Number(data.coin['24hVolume']).toLocaleString()} USDT</span>
			</div>
			<div className='w-fit flex items-center gap-4'>
				<span className='font-bold text-lg'>Market Cap: </span>
			<span className='text-blue-600 text-lg'>{Number(data.coin.marketCap).toLocaleString()} USDT</span>
			</div>
			<div className='w-fit flex items-center gap-4'>
				<span className='font-bold text-lg'>Price: </span>
			<span className='text-blue-600 text-lg'>{data.coin.price} USDT</span>
			</div>
            <p>{data.coin.description}</p>

            <div className={'w-full h-[200px]'}>
                <ChartLarge data={data.coin.sparkline}  symbol={data.coin.symbol}/>
            </div>
		</main>


    );
};

export default Page;
