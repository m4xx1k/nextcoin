'use client'
import {useSession} from "next-auth/react";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import coinService from "@/services/coin";

const useLike = ({isLiked: initialLiked = null, coin}) => {
    const {data: session} = useSession()
    const {theme} = useTheme()
    const [isLiked, setIsLiked] = useState(initialLiked)
    const [liked, setLiked] = useState(isLiked ? '💖' : (theme === 'dark' ? '🖤' : '🤍'))
    const toggleLike = async () => {
        if (session && session?.user?.email) {
            await coinService.toggleLiked({coin: coin.uuid, user: session.user.email})
            setLiked(prev => prev === '💖' ? (theme === 'dark' ? '🖤' : '🤍') : '💖')
        } else {
            alert('You have to Sign In to save the coins!')
        }
    }
    useEffect(() => {
        if (liked === '🖤' || liked === '🤍')
            setLiked(theme === 'dark' ? '🖤' : '🤍')
    }, [theme])
    useEffect(() => {
        const fetch = async () => {
            if (isLiked===null && session) {
                const {result: likes} = await coinService.getLikes(session.user.email)

                if(likes.map(like => like.coin).includes(coin.uuid)){
                    setIsLiked(true)
                    setLiked('💖')
                }
            }

        }
        fetch()
    }, [session])
    return {toggleLike, liked}
}
export default useLike
