import MainContent from "@/components/MainContent";

export default function Home() {
    return (
        <main>
            <div className='m-4'>
                <div className='py-2'>
                    <h1 className='text-2xl md:text-5xl text-secondary-content font-bold border-l-4 border-warning px-2'>
                        Premiering right now...
                    </h1>
                </div>
                <MainContent />
            </div>
        </main>
    );
}
