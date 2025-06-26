import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../../components/Header/AdminHeader'

const AdminRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingId, setUpdatingId] = useState(null);
    const [activeTab, setActiveTab] = useState('new');
    const [showApprovalForm, setShowApprovalForm] = useState(false);
    const [currentRequestId, setCurrentRequestId] = useState(null);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        message: ''
    });

    // Static hospital address data
    const hospitalAddress = {
        name: "City General Hospital",
        address: "123 Medical Center Drive, Healthville, HV 12345",
        contact: "+1 (555) 123-4567"
    };

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

    const handleApprovalClick = (requestId) => {
        setCurrentRequestId(requestId);
        setShowApprovalForm(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.date || !formData.time) {
            setError('Please select both date and time');
            return;
        }

        try {
            setUpdatingId(currentRequestId);

            // Prepare data to send to server
            const currentRequest = requests.find(req => req._id === currentRequestId);
            var obtype = "";
            if (currentRequest.type == 'Blood') {
                obtype = currentRequest.bloodType;
            } else {
                obtype = currentRequest.organType;
            }
            const approvalData = {
                date: formData.date,
                time: formData.time,
                message: formData.message,
                type: currentRequest.type,       // Include bloodType if it exists
                val: obtype
            };

            // Optimistic update

            console.log("thie aat", currentRequest);
            setRequests(prevRequests =>
                prevRequests.map(request =>
                    request._id === currentRequestId
                        ? {
                            ...request,
                            status: 'Approved',
                            approvalDetails: {
                                ...approvalData,
                                hospital: hospitalAddress,

                            }
                        }
                        : request
                ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            );

            // Send to server - Note the URL change to include ID
            await axios.patch(
                `http://localhost:8000/api/auth/requestapprove/${currentRequestId}`,
                approvalData
            );

            // Reset form and close
            setFormData({
                date: '',
                time: '',
                message: ''
            });
            setShowApprovalForm(false);
            setCurrentRequestId(null);

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to approve request');
            console.error('Approval error:', err);

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

    const handleStatusChange = async (requestId, newStatus) => {
        if (newStatus === 'Approved') {
            handleApprovalClick(requestId);
            return;
        }

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
                { requestId, status: newStatus, }
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

                    {/* Approval Form Modal */}
                    {showApprovalForm && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                                <h2 className="text-xl font-bold mb-4">Approve Request</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                            Available Date
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleFormChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                                            Available Time
                                        </label>
                                        <input
                                            type="time"
                                            id="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleFormChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                            Additional Message (Optional)
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleFormChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            rows="3"
                                            placeholder="Any additional instructions for the user..."
                                        />
                                    </div>
                                    <div className="mb-4 p-3 bg-gray-100 rounded">
                                        <h3 className="font-bold text-sm mb-1">Hospital Information:</h3>
                                        <p className="text-sm">{hospitalAddress.name}</p>
                                        <p className="text-sm">{hospitalAddress.address}</p>
                                        <p className="text-sm">Contact: {hospitalAddress.contact}</p>
                                    </div>
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowApprovalForm(false);
                                                setCurrentRequestId(null);
                                            }}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={updatingId === currentRequestId}
                                            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${updatingId === currentRequestId ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                                        >
                                            {updatingId === currentRequestId ? 'Sending...' : 'Confirm Approval'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Rest of your existing code... */}
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
                {request.status === 'Approved' && request.approvalDetails && (
                    <div className="mt-2 p-2 bg-green-100 rounded">
                        <p className="text-sm font-medium text-green-800">Approval Details:</p>
                        {/* <p className="text-sm text-green-700">
                            Available on: {formatDate(request.approvalDetails.date)} at {request.approvalDetails.time}
                        </p> */}
                        {request.approvalDetails.message && (
                            <p className="text-sm text-green-700">Message: {request.approvalDetails.message}</p>
                        )}
                        <p className="text-sm text-green-700">
                            Hospital: {request.approvalDetails.hospital.name}, {request.approvalDetails.hospital.address}
                        </p>
                    </div>
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
                        onClick={() => handleStatusChange(request._id, 'Unavailable')}
                        disabled={updatingId === request._id}
                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white ${updatingId === request._id
                            ? 'bg-gray-400'
                            : 'bg-gray-600 hover:bg-gray-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                    >
                        {updatingId === request._id ? 'Updating...' : 'Unavailable'}
                    </button>
                </div>
            )}
        </div>
    </li>
);

export default AdminRequestsPage;