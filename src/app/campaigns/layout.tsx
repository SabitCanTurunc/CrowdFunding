
import Image from "next/image"
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <Image
                src="/images/campaignPageBg.png"
                alt="background"
                layout="fill"
                objectFit="cover"
                priority
                className="absolute inset-0 -z-20"
            />
            {children}
        </main>
    )
}

export default layout