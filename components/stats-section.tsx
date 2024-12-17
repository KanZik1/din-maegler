import Image from "next/image"
import { Home } from 'lucide-react'

export default function StatsSection() {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left side - Image with overlay */}
                <div className="relative">
                    <div className="relative w-full aspect-square max-w-[500px]">
                        <Image
                            src="/FamilyPicture.png"
                            alt="Familie med barn foran hus"
                            fill
                            className="object-cover"
                        />
                        {/* Navy blue frame overlay */}
                        <div className="absolute inset-4 border-4 border-[#1B2A4E]" />
                        {/* Stats overlay */}
                        <div className="absolute bottom-0 right-0 bg-[#1B2A4E] p-6 text-white">
                            <div className="text-5xl font-bold">38+</div>
                            <div className="text-sm whitespace-nowrap">
                                års mægler-<br />erfaring
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Content */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-[#1B2A4E]">
                        Vi har fulgt danskerne hjem<br />i snart 4 årtier
                    </h2>
                    <h3 className="text-xl font-semibold">
                        Det synes vi siger noget om os!
                    </h3>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            It is a long established fact that a reader will be distracted by the
                            readable content of a page when looking at its layout. The point of
                            using Lorem Ipsum is that it has normal distribution.
                        </p>
                        <p>
                            It is a long established fact that a reader will be distracted by the
                            readable content of a page when looking at its layout.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-12 pt-4">
                        <div className="flex items-center gap-3">
                            <Home className="h-8 w-8 text-[#1B2A4E]" />
                            <div>
                                <div className="text-2xl font-bold">4829</div>
                                <div className="text-sm text-gray-600">boliger solgt</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Home className="h-8 w-8 text-[#1B2A4E]" />
                            <div>
                                <div className="text-2xl font-bold">158</div>
                                <div className="text-sm text-gray-600">boliger til salg</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

