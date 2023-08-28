'use client'
import {CoinRow, CoinsTableHead} from "@/app/page";
import React, {useEffect, useState} from 'react';
import coinService from '@/services/coin'
import ReactPaginate from 'react-paginate';

const limit = 100


const AllCoinsTable = () => {
    const [coins, setCoins] = useState([])
    const [offset, setOffset] = useState(0)
    const [paginationLength, setPaginationLength] = useState()
    useEffect(() => {
        const getData = async () => {
            console.log({offset})
            const {data} = await coinService.getCoins({offset: offset * limit, limit})
            setCoins(data.coins)
            setPaginationLength((data.stats.total / limit).toFixed(0))
        }
        getData()
    }, [offset])
    if (!coins.length) return null
    return (
        <>
            <h2 id={'allcoins'} className={'text-xl mt-4 font-medium'}>All Coins</h2>

            <table className={'w-full max-w-screen lg:max-w-5xl overflow-x-scroll shadow-lg mt-1'}>
                <CoinsTableHead/>
                <tbody className={'h-full responsive pb-8'}>
                {
                    coins.map((coin, i) => <CoinRow coin={coin} i={i + Number(offset) * limit} key={coin.uuid}/>)
                }


                </tbody>
            </table>
            <ReactPaginate breakLabel="..."
                           nextLabel=">"
                           onPageChange={(data) => setOffset(data.selected)}
                           className={'sticky left-0 my-4 w-full flex items-center justify-center gap-1 md:gap-4'}
                           pageClassName={' w-fit px-[6px] rounded-lg py-1 bg-zinc-700 text-xs md:text-md'}
                           pageRangeDisplayed={3}
                           pageCount={paginationLength}
                           previousLabel="<"
                           renderOnZeroPageCount={null}/>
            {/*<Pagination paginationLength={paginationLength} offset={offset} onPageChange={setOffset}/>*/}
        </>
    );
};

export default AllCoinsTable;
