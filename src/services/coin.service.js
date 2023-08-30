import firebase_app from "@/firebase";
import {getFirestore, doc, setDoc, getDocs, query, where, collection, and, deleteDoc} from "firebase/firestore";
import {v4 as uuidv4} from 'uuid';
import {getLocalCoin, getLocalCoins} from '@/helpers/utils';
import useSWR from 'swr'

const db = getFirestore(firebase_app)
const likedRef = collection(db, "like");


const fetcher = async ({url, params = null, method = 'GET', body = null, revalidate = null}) => {

    const options = {}
    const headers = new Headers()
    headers.append('x-access-token', 'coinranking6a945e4fba09a8b24a410d03787b54f2ee68876e3f8197ea')

    if (revalidate) options.next = {revalidate}
    if (body) options.body = body

    options.headers = headers
    options.method = method
    const urlWithParams = `https://api.coinranking.com/v2/${url}${params ? `?${new URLSearchParams(params).toString()}` : ''}`
    const res = await fetch(urlWithParams, options)
    if (!res.ok) throw new Error(`Fail to fetch ${url}\n${JSON.stringify(res.error, null, 4)}`)
    return res.json()
}

class CoinService {
    async getCoins(params) {
        const {data} =  await fetcher({url: 'coins', params})
        return data
    }

    async useCoins(params) {
        return  useSWR('coins', () => this.getCoins(params))
    }

    async getLocalCoins() {
        return setTimeout(() => getLocalCoins(), 1000)
    }

    async getLocalCoin() {
        return setTimeout(() => getLocalCoin(), 1000)
    }

    async getStats() {
        const stats = await fetcher({url: 'stats'})
        const newest = []
        for (let coin of stats.data.newestCoins) {
            const data = await this.getCoin(coin.uuid)
            newest.push(data.data.coin)
        }
        const best = []
        for (let coin of stats.data.bestCoins) {
            const data = await this.getCoin(coin.uuid)
            best.push(data.data.coin)
        }
        return {...stats, newest, best}
    }

    async getCoin(id, params) {
        return await fetcher({url: `coin/${id}`, params})
    }

    async getLikes(user) {

        let result = null
        let error = null
        try {
            const q = query(likedRef,
                where('user', '==', user),
            )
            const querySnap = await getDocs(q);
            result = []
            querySnap.forEach(like => result.push(like.data()))

        } catch (e) {
            error = e

        }
        return {result, error}

    }

    async getLocalLikes(user) {


        return setTimeout(() => ({result: [{user: 'maxikfabin@gmail.com', coin: 'asdlkfj'}]}), 1500)

    }

    async toggleLiked({coin, user}) {
        let result = null;
        let error = null;

        try {
            const isLiked = await this.getLiked({coin, user})
            if (isLiked) {
                const data = await deleteDoc(doc(db, 'like', isLiked.id))
                result = {status: 'unlike', data}

            } else {
                const data = await this.setLiked({coin, user})
                result = {status: 'like', data}
            }

        } catch (e) {
            error = e;
        }

        return {result, error};
    }

    async setLiked({coin, user}) {
        let result = null;
        let error = null;

        try {
            result = await setDoc(doc(db, 'like', uuidv4()), {coin, user}, {
                merge: true,
            });
        } catch (e) {
            error = e;
        }

        return {result, error};
    }

    async getLiked({coin, user}) {
        const q = query(likedRef, and(
            where('user', '==', user),
            where('coin', '==', coin),
        ));
        const querySnap = await getDocs(q);
        let result = null
        querySnap.forEach((like, i) => {
            if (!i) {
                result = {...like.data(), id: like.id}
            }
        })
        return result

    }

}

const coinService = new CoinService()
export default coinService;
