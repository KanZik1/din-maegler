'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState } from "react"

export default function Hero() {
    const [propertyCount] = useState(158)
    const [storeCount] = useState(74)

    return (
        <div style={{ position: "relative", height: "600px", width: "100%" }}>
            {/* Background Image */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: "url('/HeroImage.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(75%)",
                    zIndex: -1, // Ensures this div is in the background
                }}
            ></div>

            {/* Content Overlay */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
                <h1 className="mb-8 text-4xl font-bold text-white md:text-5xl">
                    Søg efter din drømmebolig
                </h1>

                <Card className="w-full max-w-3xl">
                    <CardHeader className=" p-4">
                        <p className="text-sm text-gray-600">
                            Søg blandt {propertyCount} boliger til salg i {storeCount} butikker
                        </p>
                    </CardHeader>
                    <CardContent className="p-4">
                        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="search" className="text-sm font-medium">
                                    Hvad skal din næste bolig indeholde
                                </label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        id="search"
                                        type="text"
                                        placeholder="Søg på fx. glaskeramisk komfur, bryggers, kælder eller lignende"
                                        className="flex-1 w-full"
                                    />
                                    <Button
                                        type="submit"
                                        className="bg-[#1B2A4E] hover:bg-[#1B2A4E]/90"
                                    >
                                        Søg
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
