import Link from "next/link"
import Image from "next/image"

export default function Navigation() {
    return (
        <nav className="w-full border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/Logo.svg"
                            alt="DIN MÆGLER"
                            width={180}
                            height={40}
                            className="h-10 w-auto"
                            priority
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
                        <Link
                            href="/boliger-til-salg"
                            className="text-gray-700 hover:text-gray-900"
                        >
                            <span>Boliger til salg</span>
                        </Link>
                        <Link
                            href="/maeglere"
                            className="text-gray-700 hover:text-gray-900"
                        >
                            <span>Mæglere</span>
                        </Link>
                        <Link
                            href="/mine-favoritter"
                            className="text-gray-700 hover:text-gray-900"
                        >
                            <span>Mine favoritter</span>
                        </Link>
                        <Link
                            href="/kontakt"
                            className="text-gray-700 hover:text-gray-900"
                        >
                            <span>Kontakt os</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

