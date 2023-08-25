'use client'
import { Discord, Youtube, Globe, Reddit, Github, Twitter, Twitch, Telegram, Medium, Facebook ,Instagram, ChatLeftText} from 'react-bootstrap-icons';
import Image from 'next/image'
import Link from "next/link";
const linksImages = {
	discord:Discord,
	youtube : Youtube,
	reddit:Reddit,
	github:Github,
	twitter:Twitter,
	twitch:Twitch,
	website:Globe,
	telegram:Telegram,
	medium:Medium,
	facebook:Facebook,
	instagram:Instagram,
	bitcointalk:ChatLeftText
}
const Type= ({type}) => {
	const Elem = linksImages[type]
	if(!Elem) return <span>{type}</span>
	return <Elem size={24}/>
}

const CoinLinks = ({links})=>{
	return (
			<div className='w-fit flex items-center gap-6 flex-wrap justify-center md:justify-normal my-4 md:my-0'>
				{links.map(link=> linksImages[link.type] &&
					<Link href={link.url} key={link.url}>
						<Type type={link.type}/>
					</Link>)}
			</div>
	)
}
export default CoinLinks