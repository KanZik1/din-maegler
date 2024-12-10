import Image from "next/image";

const Boligertilsalg = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero sektion med baggrundsbillede */}
            <div className="relative h-[300px] w-full">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <Image
                    src="/bolig-hero.jpg" // Sørg for at have dette billede i din public mappe
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

            {/* Boligliste */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Boligkort 1 */}
                    <div className="border rounded-lg overflow-hidden shadow-lg">
                        <div className="relative h-[250px]">
                            <Image
                                src="/klosterengen.jpg" // Tilføj dette billede
                                alt="Klosterengen 234"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">Klosterengen 234</h3>
                            <p className="text-gray-600">4000 Roskilde</p>
                            <div className="mt-2">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                    4 værelser • 156 m²
                                </span>
                            </div>
                            <p className="mt-4 text-xl font-bold">Kr. 4.567.890</p>
                        </div>
                    </div>

                    {/* Gentag lignende struktur for flere boliger */}
                </div>
            </div>
        </div>
    );
};

export default Boligertilsalg;
