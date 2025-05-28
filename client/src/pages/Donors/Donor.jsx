import React from "react";
import DonorHeader from "../../components/Header/DonorHeader";

const DonationHistoryPage = () => {
    // Sample donation data
    const donations = [
        {
            id: 1,
            date: "2023-10-15",
            campaign: "Emergency Relief Fund",
            status: "Completed",
            receiptNo: "RC-78945",
        },
        {
            id: 2,
            date: "2023-08-22",
            campaign: "Education for All",
            status: "Completed",
            receiptNo: "RC-67342",
        },
        {
            id: 3,
            date: "2023-05-10",
            campaign: "Clean Water Initiative",
            status: "Completed",
            receiptNo: "RC-55821",
        },
        {
            id: 4,
            date: "2023-02-28",
            campaign: "Medical Supplies Drive",
            status: "Completed",
            receiptNo: "RC-44236",
        },
    ];

    return (
        <>
            <DonorHeader />
            <div className="min-h-screen bg-gray-50">


                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    {/* Summary Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-gray-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Your Giving Summary
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600 font-medium">Total Donations</p>
                                <p className="text-2xl font-bold text-gray-800">4</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600 font-medium">Last Donation</p>
                                <p className="text-2xl font-bold text-gray-800">Oct 15, 2023</p>
                            </div>
                        </div>
                    </div>

                    {/* Donation List */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Past Donations
                            </h2>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                            Campaign
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                            Receipt
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {donations.map((donation) => (
                                        <tr key={donation.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {new Date(donation.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {donation.campaign}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {donation.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 hover:text-red-800">
                                                <a
                                                    href="#"
                                                    className="underline hover:no-underline"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        alert(`Receipt ${donation.receiptNo} would be downloaded`);
                                                    }}
                                                >
                                                    Download
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </a>
                                <a
                                    href="#"
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </a>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">1</span> to{" "}
                                        <span className="font-medium">4</span> of{" "}
                                        <span className="font-medium">4</span> donations
                                    </p>
                                </div>
                                <div>
                                    <nav
                                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                        aria-label="Pagination"
                                    >
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Previous</span>
                                            &larr;
                                        </a>
                                        <a
                                            href="#"
                                            aria-current="page"
                                            className="z-10 bg-gray-50 border-gray-500 text-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        >
                                            1
                                        </a>
                                        <a
                                            href="#"
                                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        >
                                            2
                                        </a>
                                        <a
                                            href="#"
                                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        >
                                            3
                                        </a>
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Next</span>
                                            &rarr;
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}

                </main>


            </div>
        </>
    );
};

export default DonationHistoryPage;