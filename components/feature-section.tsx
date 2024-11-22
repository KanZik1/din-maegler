import { FileText, MapPin, UserPlus } from 'lucide-react'

export default function FeaturesSection() {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row gap-8 justify-between">
                <FeatureItem
                    icon={<FileText className="h-8 w-8 text-[#1B2A4E]" />}
                    title="Bestil et salgstjek"
                    description="Med et Din Mægler Salgstjek bliver du opdateret på værdien af din bolig."
                />
                <FeatureItem
                    icon={<MapPin className="h-8 w-8 text-[#1B2A4E]" />}
                    title="74 butikker"
                    description="Hos Din Mægler er din bolig til salg i alle vores 74 butikker, som er fordelt rundt om i Danmark."
                />
                <FeatureItem
                    icon={<UserPlus className="h-8 w-8 text-[#1B2A4E]" />}
                    title="Tilmeld køberkartotek"
                    description="Når du er tilmeldt vores køberkartotek, bliver du kontaktet inden en ny bolig bliver annonceret."
                />
            </div>
        </section>
    )
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex flex-col items-start">
            <div className="mb-2">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

