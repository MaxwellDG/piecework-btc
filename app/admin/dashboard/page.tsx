import CompaniesList from '../../(components)/companies/companiesList';

export default function Dashboard() {
    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
            <div className="m-auto w-full max-w-3xl">
                <div className="flex justify-between h-20 items-start">
                    <h2 className="text-4xl font-bold mb-2">Companies</h2>
                </div>
                <CompaniesList />
            </div>
        </div>
    );
}
