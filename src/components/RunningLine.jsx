import React from 'react';
import {short} from "@/helpers/utils";

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


export default RunningLine;
