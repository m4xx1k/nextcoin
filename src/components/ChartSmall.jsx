'use client'

import {AreaChart, Area, XAxis, YAxis,  ResponsiveContainer} from 'recharts';


export default function ChartSmall({data, isIncrease}) {
    const domain = [`dataMin`, `dataMax`]
    const color = isIncrease ?'#39FF14':'#FF3131'
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                margin={{
                    top:4,
                    left:-60,
                    bottom:-24,

                }}
                width={120}
                height={44}
                data={data.map((e, i) => ({price: Number(e).toFixed(4), name: i}))}
            >
                <XAxis  dataKey="name"  axisLine={false}  tickLine={false} />
                <YAxis domain={domain} dataKey={'price'}  axisLine={false} tickLine={false}/>
                <Area type="linear" dataKey="price" stroke={color}  fillOpacity={0.4} fill={color} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

