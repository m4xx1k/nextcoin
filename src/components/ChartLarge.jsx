'use client'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {price} from "@/helpers/utils";
const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
const toDate = (len,i)=>{
	const now = new Date()
	const date = new Date(now.getTime() - (len - i)*1000*60*60*24)
	const day = date.getDate()
	const month = months[date.getMonth()].length<= 4 ?months[date.getMonth()]: months[date.getMonth()].slice(0,3)

	return `${day}, ${month}`
}
export default function ChartLarge({data}) {
	const domain = [`dataMin`, `dataMax`]

	return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={400}
                height={200}
                data={data.map((e, i) => ({price: price(e), name: toDate(data.length,i)}))}
                margin={{
                    top: 10,
                    right: 30,
                    left: 16,
                    bottom: 0,
                }}
            >
                <CartesianGrid color='#bbb' opacity={0.15} width={'0.5px'} vertical={false}/>
                <XAxis tick={{fontSize:8}} dataKey="name"  axisLine={false}  tickLine={false} />
                <YAxis tick={{fontSize:10}} domain={domain} dataKey={'price'}  axisLine={false} tickLine={false} tickCount={7}/>
                <Tooltip content={<CustomTooltip/>} />
                <Area type="linear" dataKey="price" stroke="#1B03A3" strokeWidth={'2px'} fillOpacity={0.4} fill="#1B03A3" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
const CustomTooltip=({active, payload, label})=>{
	return (
		<div className='text-xs p-2 bg-gray-400  dark:bg-gray-600 rounded-lg'>
			{/* {JSON.stringify(payload)} */}
			<div className='flex items-center justify-between w-full gap-2'>
				<span>Price: </span><span className='font-bold text-light dark:text-dark'>{payload[0]?.value} USDT</span>
			</div>

			<div className='flex items-center justify-between w-full gap-2'>
				<span>Date: </span><span className='font-bold text-light dark:text-dark'>{label}</span>
			</div>
		</div>
	)
}
