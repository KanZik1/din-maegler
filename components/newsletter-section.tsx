import { ArrowRight } from 'lucide-react'

export default function NewsletterSection() {
    return (
        <section className="bg-slate-700 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-white">
                        <h3 className="text-xl font-medium">
                            Tilmeld dig vores nyhedsbrev og<br />
                            hold dig opdateret på boligmarkedet
                        </h3>
                    </div>

                    <div className="w-full md:w-auto">
                        <form>
                            <div className="relative flex items-center bg-white rounded-md">
                                <input
                                    type="email"
                                    placeholder="Indtast din email adresse"
                                    className="w-full px-4 py-2 pr-12 rounded-md focus:outline-none"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    <ArrowRight className="h-6 w-6 text-slate-700" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
} 