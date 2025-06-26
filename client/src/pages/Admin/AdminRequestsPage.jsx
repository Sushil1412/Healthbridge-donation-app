import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../../components/Header/AdminHeader'

const AdminRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingId, setUpdatingId] = useState(null);
    const [activeTab, setActiveTab] = useState('new'); // 'new' or 'history'

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const userResponse = await axios.get('http://localhost:8000/api/auth/adminapplication');
                const sortedUserRequests = userResponse.data.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setRequests(sortedUserRequests);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch requests');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleStatusChange = async (requestId, newStatus) => {
        try {
            setUpdatingId(requestId);

            // Optimistic update for user requests
            setRequests(prevRequests =>
                prevRequests.map(request =>
                    request._id === requestId
                        ? { ...request, status: newStatus }
                        : request
                ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            );

            await axios.patch(
                `http://localhost:8000/api/auth/adminapplicationupdate`,
                { requestId, status: newStatus }
            );

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update request status');
            console.error('Update error:', err);

            // Revert on error by refetching
            const userResponse = await axios.get('http://localhost:8000/api/auth/adminapplication');
            const sortedUserRequests = userResponse.data.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setRequests(sortedUserRequests);
        } finally {
            setUpdatingId(null);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Filter requests based on active tab
    const newRequests = requests.filter(request => request.status === 'Pending');
    const historyRequests = requests.filter(request => request.status !== 'Pending');

    return (
        <>
            <AdminHeader />
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Requests Dashboard</h1>

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

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('new')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'new'
                                    ? 'border-red-500 text-red-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                User Requests
                                {newRequests.length > 0 && (
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        {newRequests.length}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'history'
                                    ? 'border-red-500 text-red-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                User History
                            </button>
                        </nav>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'new' && (
                                <div className="mb-12">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4">Pending User Requests</h2>
                                    {newRequests.length === 0 ? (
                                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <h3 className="mt-2 text-lg font-medium text-gray-900">No pending user requests</h3>
                                            <p className="mt-1 text-sm text-gray-500">There are currently no new user requests.</p>
                                        </div>
                                    ) : (
                                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                            <ul className="divide-y divide-gray-200">
                                                {newRequests.map((request) => (
                                                    <RequestItem
                                                        key={request._id}
                                                        request={request}
                                                        updatingId={updatingId}
                                                        handleStatusChange={handleStatusChange}
                                                        formatDate={formatDate}
                                                    />
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'history' && (
                                <div>
                                    <h2 className="text-lg font-medium text-gray-900 mb-4">User Request History</h2>
                                    {historyRequests.length === 0 ? (
                                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <h3 className="mt-2 text-lg font-medium text-gray-900">No user request history</h3>
                                            <p className="mt-1 text-sm text-gray-500">There are no historical user requests to display.</p>
                                        </div>
                                    ) : (
                                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                            <ul className="divide-y divide-gray-200">
                                                {historyRequests.map((request) => (
                                                    <RequestItem
                                                        key={request._id}
                                                        request={request}
                                                        updatingId={updatingId}
                                                        handleStatusChange={handleStatusChange}
                                                        formatDate={formatDate}
                                                        isHistory={true}
                                                    />
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

// User Request Item Component
const RequestItem = ({ request, updatingId, handleStatusChange, formatDate, isHistory = false }) => (
    <li className={`p-4 hover:bg-gray-50 ${request.status === 'Approved' ? 'bg-green-50' :
        request.status === 'Pending' ? 'bg-yellow-50' : 'bg-gray-50'
        }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${request.type === 'Blood'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                        }`}>
                        {request.type === 'Blood' ? 'Blood' : 'Organ'}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${request.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : request.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                        {request.status}
                    </span>
                    {!isHistory && request.status === 'Pending' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            New
                        </span>
                    )}
                </div>
                <h2 className="text-lg font-medium text-gray-900">
                    {request.type === 'Blood'
                        ? `${request.bloodType} Blood Request`
                        : `${request.organType} Organ Request`}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Requested by: {request.name} ({request.email})
                </p>
                <p className="mt-1 text-sm text-gray-500">
                    Needed by: {formatDate(request.neededBy)}
                </p>
                {request.notes && (
                    <p className="mt-1 text-sm text-gray-600">
                        Notes: {request.notes}
                    </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                    Submitted on: {formatDate(request.createdAt)}
                </p>
            </div>
            {!isHistory && (
                <div className="mt-4 md:mt-0 md:ml-4 flex space-x-2">
                    <button
                        onClick={() => handleStatusChange(request._id, 'Approved')}
                        disabled={updatingId === request._id}
                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white ${updatingId === request._id
                            ? 'bg-green-400'
                            : 'bg-green-600 hover:bg-green-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                    >
                        {updatingId === request._id ? 'Approving...' : 'Approve'}
                    </button>
                    <button
                        onClick={() => handleStatusChange(request._id, 'unavailable')}
                        disabled={updatingId === request._id}
                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white ${updatingId === request._id
                            ? 'bg-gray-400'
                            : 'bg-gray-600 hover:bg-gray-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                    >
                        {updatingId === request._id ? 'Updating...' : 'Reject'}
                    </button>
                </div>
            )}
        </div>
    </li>
);

export default AdminRequestsPage;