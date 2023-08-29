'use client'
import useLike from "@/helpers/useLike";

const TableLikeCell = ({coin, isLiked}) => {
    const {liked, toggleLike} = useLike({isLiked, coin})
    return (
        <td className={'text-center p-4'} onClick={toggleLike}>
            {liked}
        </td>
    );
};

export default TableLikeCell;
