import { useState } from 'react';
import HospitalHeader from '../../components/Header/HospitalHeader';
import { Link } from 'react-router-dom';

const HospitalDashboard = () => {
    // Blood inventory summary data
    const [bloodSummary] = useState({
        criticalTypes: 2,
        totalUnits: 72
    });

    // Organ inventory summary data
    const [organSummary] = useState({
        available: 5,
        waitlist: 32
    });

    // Doctors summary data
    const [doctorSummary] = useState({
        available: 3,
        total: 4
    });

    // Requests data
    const [requests] = useState([
        { id: 1, type: 'Blood', subtype: 'B-', quantity: 2, patient: 'John Doe', status: 'Pending', date: '2023-05-15' },
        { id: 2, type: 'Organ', subtype: 'Kidney', quantity: 1, patient: 'Jane Smith', status: 'Approved', date: '2023-05-10' },
        { id: 3, type: 'Doctor', subtype: 'Cardiologist', quantity: 1, patient: 'Mike Johnson', status: 'Rejected', date: '2023-05-05' },
        { id: 4, type: 'Blood', subtype: 'AB-', quantity: 1, patient: 'Sarah Williams', status: 'Completed', date: '2023-04-28' }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Approved': return 'bg-blue-100 text-blue-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <HospitalHeader />
            <div className="p-4 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-red-700 mb-6">Hospital Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {/* Blood Summary Card */}
                    <Link to="/hospital/blood" className="block">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-red-700">Blood Stock</h2>
                                <span className="text-sm text-blue-600">View all →</span>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <span className="text-3xl font-bold text-red-700">
                                        {bloodSummary.criticalTypes}
                                    </span>
                                    <span className="text-sm text-gray-600 ml-1">critical types</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-gray-700">
                                        {bloodSummary.totalUnits}
                                    </span>
                                    <span className="text-sm text-gray-600 ml-1">total units</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Organ Summary Card */}
                    <Link to="/hospital/organ" className="block">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-red-700">Organ Availability</h2>
                                <span className="text-sm text-blue-600">View all →</span>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <span className="text-3xl font-bold text-green-600">
                                        {organSummary.available}
                                    </span>
                                    <span className="text-sm text-gray-600 ml-1">available</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-gray-700">
                                        {organSummary.waitlist}
                                    </span>
                                    <span className="text-sm text-gray-600 ml-1">waiting</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Doctor Summary Card */}
                    <Link to="/hospital/doctor" className="block">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-red-700">Doctors</h2>
                                <span className="text-sm text-blue-600">View all →</span>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <span className="text-3xl font-bold text-green-600">
                                        {doctorSummary.available}
                                    </span>
                                    <span className="text-sm text-gray-600 ml-1">available</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-gray-700">
                                        {doctorSummary.total}
                                    </span>
                                    <span className="text-sm text-gray-600 ml-1">total doctors</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Requests Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-red-700 mb-4">Recent Requests</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtype</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {requests.map((request) => (
                                    <tr key={request.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.subtype}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.patient}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                                {request.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HospitalDashboard;