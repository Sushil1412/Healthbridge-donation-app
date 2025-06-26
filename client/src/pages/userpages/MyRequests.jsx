import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserHeader from '../../components/Header/UserHeader';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');

    const id = localStorage.getItem('email');

    useEffect(() => {
        fetchRequestsFromBackend();
    }, []);

    const fetchRequestsFromBackend = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/auth/userrequest/${id}`);
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    // const handleCancelRequest = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:8000/api/auth/userrequest/${id}`);
    //         setRequests(prev => prev.filter(req => req._id !== id));
    //     } catch (error) {
    //         console.error('Error canceling request:', error);
    //     }
    // };

    return (
        <>
            <UserHeader />
            <div className="min-h-screen bg-gray-50">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">My Requests</h1>
                        <div className="mt-2 flex items-center">
                            <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">
                                Dashboard
                            </Link>
                            <span className="mx-2 text-gray-500">/</span>
                            <span className="text-gray-600">My Requests</span>
                        </div>
                    </div>

                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('pending')}
                                className={`${activeTab === 'pending' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Pending Requests
                            </button>
                            <button
                                onClick={() => setActiveTab('completed')}
                                className={`${activeTab === 'completed' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Completed Requests
                            </button>
                        </nav>
                    </div>

                    {activeTab === 'pending' ? (
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 px-4 py-5 sm:px-6">
                                Pending Requests
                            </h3>
                            {requests.filter(req => req.status !== 'Approved').length === 0 ? (
                                <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
                                    No pending requests found.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Type
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Details
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Needed By
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {requests
                                                .filter(req => req.status === 'Pending')
                                                .map((request) => (
                                                    <tr key={request._id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {request.type}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {request.bloodType || request.organ}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {request.neededBy || 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                                request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-red-100 text-red-800'
                                                                }`}>
                                                                {request.status}
                                                            </span>
                                                        </td>
                                                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <button
                                                                onClick={() => handleCancelRequest(request._id)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </td> */}
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 px-4 py-5 sm:px-6">
                                Completed Requests
                            </h3>
                            {requests.filter(req => req.status === 'Approved').length === 0 ? (
                                <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
                                    No completed requests found.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Type
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Details
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date Completed
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {requests
                                                .filter(req => req.status === 'Approved')
                                                .map((request) => (
                                                    <tr key={request._id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {request.type}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {request.bloodType || request.organ}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {request.updatedAt || 'N/A'}
                                                        </td>

                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default MyRequests;