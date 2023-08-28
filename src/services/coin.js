const fetcher = async (url, params, method = 'GET', body, revalidate) => {

    const options = {}
    const headers = new Headers()
    headers.append('x-access-token', 'coinranking6a945e4fba09a8b24a410d03787b54f2ee68876e3f8197ea')

    if (revalidate) options.next = {revalidate}
    if (body) options.body = body

    options.headers = headers
    options.method = method
    const urlWithParams = `https://api.coinranking.com/v2/${url}${params ? `?${new URLSearchParams(params).toString()}` : ''}`
    const res = await fetch(urlWithParams, options)
    console.log({urlWithParams})
    if (!res.ok) throw new Error(`Fail to fetch ${url}\n${JSON.stringify(res.error, null, 4)}`)
    return res.json()
}

class CoinService {
    async getCoins(params) {
        return await fetcher('coins', params)
    }

    async getStats() {
        const stats = await fetcher('stats')
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
        return await fetcher(`coin/${id}`, params)
    }


}

export default new CoinService();
