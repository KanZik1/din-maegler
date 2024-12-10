import Image from 'next/image';

const AppDownload = () => {
    return (
        <section className="bg-[#1B2942] relative overflow-hidden">
            <div className="container mx-auto px-16 pt-32 pb-16 flex items-center justify-between">
                {/* Venstre side med tekst */}
                <div className="max-w-[520px] z-10">
                    <h2 className="text-white text-[44px] leading-[1.2] font-normal mb-6">
                        Hold dig opdateret
                        <br />
                        på salgsprocessen
                    </h2>
                    <p className="text-white/70 text-[17px] leading-relaxed mb-10">
                        Når du sælger din bolig hos Din Mægler, kommunikerer du nemt
                        med din ansvarlige mægler eller butik med vores app. Her kan du
                        også se statistik på interessen for din bolig i alle vores
                        salgskanaler.
                    </p>

                    <div className="flex items-center gap-4">
                        {/* Google Play knap */}
                        <a
                            href="#"
                            className="flex items-center bg-[#0B1421] text-white hover:bg-white hover:text-black border border-white/20 rounded-lg px-6 py-3 transition-all group"
                        >
                            <svg
                                className="w-5 h-5 mr-3 group-hover:fill-black"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M3.609 1.814L13.792 12 3.61 22.186c-.28-.305-.44-.708-.44-1.134V2.948c0-.426.16-.83.44-1.134zm10.831 10.833l2.717-2.718L6.489 4.12l8.768 4.708 2.718-2.718 3.675 1.83c.654.327 1.069.982 1.069 1.707 0 .726-.415 1.38-1.069 1.707l-3.675 1.83-2.718-2.718-8.768 4.708 10.668-4.891z" />
                            </svg>
                            <span className="text-sm font-medium">Google Play</span>
                        </a>

                        {/* Apple Store knap */}
                        <a
                            href="#"
                            className="flex items-center bg-[#0B1421] text-white hover:bg-white hover:text-black border border-white/20 rounded-lg px-6 py-3 transition-all group"
                        >
                            <svg
                                className="w-5 h-5 mr-3 group-hover:fill-black"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            <span className="text-sm font-medium">Apple Store</span>
                        </a>
                    </div>
                </div>

                {/* Højre side med iPhones */}
                <div className="relative w-[480px] h-auto flex items-center">
                    <div className="absolute">
                        <Image
                            src="/Iphone1.png"
                            alt="App visning 1"
                            width={250}
                            height={500}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="absolute right-0">
                        <Image
                            src="/Iphone2.png"
                            alt="App visning 2"
                            width={250}
                            height={500}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppDownload;
