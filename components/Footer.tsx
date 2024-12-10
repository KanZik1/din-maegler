const Footer = () => {
    return (
        <footer className="bg-white relative">
            <div className="container mx-auto px-16 py-12">
                {/* Logo og tekst */}
                <div className="max-w-[400px] mb-8">
                    <img src="/Logo.svg" alt="Din Mægler" className="h-8 mb-4" />
                    <p className="text-gray-600 text-sm">
                        There are many variations of passages of Lorem Ipsum available, but the majority have
                        suffered alteration in some form, by injected humour, or randomised words.
                    </p>
                </div>

                {/* Kontakt information og Quick Links - 2 kolonner */}
                <div className="grid grid-cols-2 gap-16">
                    {/* Venstre kolonne - Kontakt info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#162A41] p-2 rounded-full">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">RING TIL OS</p>
                                <p className="text-sm">+45 7070 4000</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="bg-[#162A41] p-2 rounded-full">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">SEND EN MAIL</p>
                                <p className="text-sm">4000@dinmaegler.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="bg-[#162A41] p-2 rounded-full">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">BESØG OS</p>
                                <p className="text-sm">Stændertorvet 78, 4000 Roskilde</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mt-4">
                            Din Mægler Roskilde, er din boligbutik i lokalområdet.
                        </p>
                    </div>

                    {/* Højre kolonne - Quick Links */}
                    <div>
                        <h3 className="font-medium mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Boliger til salg</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Mæglere</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Kontakt os</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Log ind / bliv bruger</a></li>
                        </ul>

                        {/* DMS Logo */}
                        <div className="mt-8">
                            <p className="text-xs text-gray-500 mb-1">MEDLEM AF</p>
                            <img src="/dms-logo.svg" alt="Dansk Mægler Sammenslutning" className="h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 