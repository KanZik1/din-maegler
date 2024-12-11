import Image from 'next/image'
import { FavoritesList } from '@/components/ClientWrapper'

export default function FavoritterPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero sektion */}
            <div className="relative h-[300px] w-full">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <Image
                    src="/kontakt-hero.jpg"
                    alt="Mine favoritter"
                    fill
                    className="object-cover"
                />
                <h1 className="absolute z-20 text-white text-4xl font-bold text-center w-full top-1/2 transform -translate-y-1/2">
                    Mine favoritboliger
                </h1>
            </div>

            <FavoritesList />
        </div>
    )
} 