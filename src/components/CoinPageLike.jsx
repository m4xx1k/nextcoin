'use client'
import useLike from "@/helpers/useLike";

const CoinPageLike = ({coin}) => {

    const {liked, toggleLike} = useLike({coin})
    return (
        <button onClick={toggleLike} className={'text-xl cursor-pointer'}>
            {liked}
        </button>
    );
};

export default CoinPageLike;
