'use client'
import {CoinRow, CoinsTableHead} from "@/app/page";
import React, {useEffect, useState} from 'react';
import coinService from '@/services/coin'
import ReactPaginate from 'react-paginate';

const limit = 50


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
            <h2 id={'allcoins'} className={'sticky left-0 text-xl mt-4 font-medium'}>All Coins</h2>

            <table className={'w-full max-w-screen lg:max-w-5xl overflow-x-scroll shadow-lg mt-1'}>
                <CoinsTableHead/>
                <tbody className={'h-full responsive pb-8'}>
                {
                    coins.map((coin, i) => <CoinRow coin={coin} i={i + Number(offset) * limit} key={coin.uuid}/>)
                }


                </tbody>
            </table>
            <ReactPaginate
                           onPageChange={(data) => setOffset(data.selected)}
                           containerClassName={'sticky left-0 my-4 w-full flex items-center justify-center rounded-lg'}
                           pageClassName={'w-fit border-x border-zinc-400 px-[6px] py-1 bg-zinc-700 text-xs md:text-md'}
                           activeClassName={'w-fit px-3 py-0.5 rounded bg-blue-700 border-none text-md md:text-lg'}
                           pageRangeDisplayed={3}
                           pageCount={paginationLength}
                           previousLabel={<div className={'w-fit rounded-l-md px-[6px] py-1 bg-zinc-700 text-xs md:text-md'}> {'<'} </div>}
                           nextLabel={<div className={'w-fit rounded-r-md px-[6px] py-1 bg-zinc-700 text-xs md:text-md'}> {'>'} </div>}
                           breakLabel={<div className={'w-fit px-[6px] py-1 bg-zinc-700 text-xs md:text-md'}> ... </div>}
                           renderOnZeroPageCount={null}/>
            {/*<Pagination paginationLength={paginationLength} offset={offset} onPageChange={setOffset}/>*/}
        </>
    );
};

export default AllCoinsTable;
