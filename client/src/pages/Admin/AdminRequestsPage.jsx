import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8000/api/auth/adminapplication');
                setRequests(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch requests');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleStatusChange = async (requestId, newStatus) => {
        try {
            // Find the request to get the email
            const requestToUpdate = requests.find(request => request._id === requestId);
            if (!requestToUpdate) {
                throw new Error('Request not found');
            }

            // Use email instead of ID in the API call
            //console.log(requests);
            //console.log(requestToUpdate.email);
            // const email = requestToUpdate.email;
            await axios.patch(
                `http://localhost:8000/api/auth/adminapplicationupdate`,
                {
                    email: requestToUpdate.email,
                    status: newStatus
                }
            );

            // Remove the updated request from state
            setRequests(requests.filter(request => request._id !== requestId));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update request status');
            console.error('Update error:', err);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Pending Donation Requests</h1>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No pending requests</h3>
                        <p className="mt-1 text-sm text-gray-500">There are currently no pending requests.</p>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {requests.map((request) => (
                                <li key={request._id} className="p-4 hover:bg-gray-50">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${request.type === 'blood'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {request.type === 'blood' ? 'Blood' : 'Organ'}
                                                </span>
                                            </div>
                                            <h2 className="mt-1 text-lg font-medium text-gray-900">
                                                {request.type === 'blood'
                                                    ? `${request.bloodType} Blood Request`
                                                    : `${request.organType} Organ Request`}
                                            </h2>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Requested by: {request.userName} ({request.userEmail})
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Hospital: {request.hospital || 'Not specified'}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Needed by: {formatDate(request.neededBy)}
                                            </p>
                                            {request.notes && (
                                                <p className="mt-1 text-sm text-gray-600">
                                                    Notes: {request.notes}
                                                </p>
                                            )}
                                        </div>
                                        <div className="mt-4 md:mt-0 md:ml-4 flex space-x-2">
                                            <button
                                                onClick={() => handleStatusChange(request._id, 'Approved')}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                Approved
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(request._id, 'unavailable')}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                            >
                                                Mark Unavailable
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminRequestsPage;