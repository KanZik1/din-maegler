'use client'

import Image from "next/image";
import { PropertyGrid } from "./property-grid";

const Boligertilsalg = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero sektion med baggrundsbillede */}
            <div className="relative h-[300px] w-full">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <Image
                    src="/bolig-hero.jpg"
                    alt="Boliger til salg hero"
                    fill
                    className="object-cover"
                />
                <h1 className="absolute z-20 text-white text-4xl font-bold text-center w-full top-1/2 transform -translate-y-1/2">
                    Boliger til salg
                </h1>
            </div>

            {/* Søgesektion */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-xl font-semibold mb-4">Søg efter dit drømmehus</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ejendomstype</label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option>Alle ejendomstyper</option>
                            <option>Villa</option>
                            <option>Lejlighed</option>
                            <option>Rækkehus</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pris-interval</label>
                        <input
                            type="range"
                            min="0"
                            max="12000000"
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>0 kr</span>
                            <span>12.000.000 kr</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brug PropertyGrid komponenten i stedet */}
            <PropertyGrid 
                limit={8} 
                showTitle={false}  // Fjerner overskriften da vi har hero section
            />
        </div>
    );
};

export default Boligertilsalg;
