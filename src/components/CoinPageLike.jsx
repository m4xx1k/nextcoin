'use client'


import useLike from "@/helpers/useLike";
import coinService from "@/services/coin";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";

const CoinPageLike = ({coin}) => {
    const [isLiked, setIsLiked] = useState(false)
    const {data: session} = useSession()

    const {liked, toggleLike} = useLike({coin})
    return (
        <button onClick={toggleLike} className={'text-xl cursor-pointer'}>
            {liked}
        </button>
    );
};

export default CoinPageLike;
