'use client'
import React, {useCallback, useEffect, useRef, useState} from 'react';
import coinService from '@/services/coin'
import ReactPaginate from 'react-paginate';
import CoinTableRow from "@/components/CoinTableRow";
import {useSession} from "next-auth/react";

const limit = 50

function useDebounce(callback, delay) {
    const timer = useRef();

    return useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay]);
}

const CoinsHeadCell = ({sort, handleSetSort, name, displayName}) => {
    return <th onClick={() => handleSetSort(name)}
               className={`text-left py-2 px-4 font-light min-w-[8rem] capitalize cursor-pointer ${name === sort.orderBy ? 'bg-blue-600 text-light' : ''}`}>
        {displayName || name} {sort.orderDirection === 'asc' && sort.orderBy === name ? '↑' : '↓'}
    </th>
}
const CoinsTableHead = ({sort, setSort}) => {
    const handleSetSort = (orderBy) => {
        if (orderBy === sort.orderBy) {
            setSort(prev => ({...prev, orderDirection: prev.orderDirection === 'asc' ? 'desc' : 'asc'}))
        } else {
            setSort({orderBy, orderDirection: 'desc'})
        }
    }
    return (
        <thead className={'sticky top-0 bg-zinc-200 dark:bg-zinc-900 font-light text-xs md:text-md'}>
        <tr className={''}>
            <th className='px-2 w-8 h-8 text-sm'>💖</th>

            <th className='px-2 w-8 h-8'>#</th>
            <th className={'sticky left-0 min-w-[8rem] text-left py-2  px-4 bg-zinc-200 dark:bg-zinc-900 font-light'}>Asset</th>
            <CoinsHeadCell sort={sort} handleSetSort={handleSetSort} name={'price'}/>
            <CoinsHeadCell sort={sort} handleSetSort={handleSetSort} name={'marketCap'} displayName={'Market Cap'}/>

            <CoinsHeadCell sort={sort} handleSetSort={handleSetSort} name={'24hVolume'} displayName={'24h Volume'}/>

            <CoinsHeadCell sort={sort} handleSetSort={handleSetSort} name={'change'} displayName={'24 %'}/>

            <th className={'text-left py-2 px-4 font-light min-w-[8rem]'}>24h Chart</th>
            <CoinsHeadCell sort={sort} handleSetSort={handleSetSort} name={'listedAt'} displayName={'Listed At'}/>

        </tr>
        </thead>
    )
}

const AllCoinsTable = () => {
    const {data: session} = useSession()
    const [coins, setCoins] = useState([])
    const [isLoadingCoins, setIsLoadingCoins] = useState(true)
    const [offset, setOffset] = useState(0)
    const [paginationLength, setPaginationLength] = useState()
    const [sort, setSort] = useState({orderBy: 'marketCap', orderDirection: 'desc'})
    const [search, setSearch] = useState('')
    const [likes, setLikes] = useState([])
    const [isLoadingLikes, setIsLoadingLikes] = useState(false)
    const getCoins = async () => {
        setIsLoadingCoins(true)
        if (search) setOffset(0)
        const {data} = await coinService.getCoins({offset: offset * limit, limit, search, ...sort})

        setCoins(data.coins)
        setPaginationLength((data.stats.total / limit).toFixed(0))
        setIsLoadingCoins(false)
    }
    const getLikes = async () => {
        if (session) {
            setIsLoadingLikes(true)
            const liked = await coinService.getLikes(session.user.email)
            setLikes(!liked.error ? liked.result.map(like => like.coin) : [])
            setIsLoadingLikes(false)
        }
    }
    const handleSearch = async () => {
        if (search.length > 2 || !search.length) {
            await getCoins()
        }
    }
    const debouncedSearch = useDebounce(handleSearch, 500)
    const onChangeSearch = async e => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        const search = async () => {
            await debouncedSearch()
        }
        search()
    }, [search])
    useEffect(() => {
        getCoins()
    }, [offset, sort])
    useEffect(() => {
        getLikes()
    }, [session])
    return (
        <>
            <h2 id={'allcoins'} className={'sticky left-0 text-xl mt-4 font-medium'}>All Coins</h2>
            <input value={search} onChange={onChangeSearch} type="text"
                   className={'sticky left-1 w-3/4 md:w-1/2 outline-none border-none py-1 px-2 rounded-lg m-1 text-sm'}
                   placeholder={'Search ...'}/>
            {
                coins.length && !isLoadingCoins && !isLoadingLikes ?


                    <div>
                        <table className={'w-full max-w-screen lg:max-w-5xl overflow-x-scroll shadow-lg mt-1'}>
                            <CoinsTableHead sort={sort} setSort={setSort}/>
                            <tbody className={'h-full responsive pb-8'}>
                            {
                                coins.map((coin, i) => <CoinTableRow likes={likes} coin={coin}
                                                                     i={i + Number(offset) * limit}
                                                                     key={coin.uuid}/>)
                            }
                            </tbody>
                        </table>
                        <ReactPaginate
                            onPageChange={(data) => setOffset(data.selected)}
                            containerClassName={'sticky left-0 my-4 w-full flex items-center justify-center rounded-lg text-light'}
                            activeClassName={'w-fit px-3 py-0.5 rounded bg-blue-700 border-none text-md md:text-lg'}
                            pageClassName={'w-fit border-x border-zinc-200 px-[6px] py-1 bg-zinc-400 dark:bg-zinc-600 text-xs md:text-md'}
                            pageRangeDisplayed={3}
                            pageCount={paginationLength}
                            previousLabel={<div
                                className={'w-fit rounded-l-md px-[6px] py-1 bg-zinc-400 dark:bg-zinc-600 text-xs md:text-md'}> {'<'} </div>}
                            nextLabel={<div
                                className={'w-fit rounded-r-md px-[6px] py-1 bg-zinc-400 dark:bg-zinc-600 text-xs md:text-md'}> {'>'} </div>}
                            breakLabel={<div
                                className={'w-fit px-[6px] py-1 bg-zinc-400 dark:bg-zinc-600 text-xs md:text-md'}> ... </div>}
                            renderOnZeroPageCount={null}/>
                    </div>
                    :
                    <h2>Coins not found :/</h2>
            }
        </>
    );
};

export default AllCoinsTable;
