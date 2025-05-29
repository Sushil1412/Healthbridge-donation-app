import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserHeader from '../../components/Header/UserHeader';
import axios from 'axios';

const RecipientDashboard = () => {
    const [activeTab, setActiveTab] = useState('requests');
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [requests, setRequests] = useState([]);

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

    const handleNewRequest = () => {
        setShowRequestForm(true);
    };

    const handleSubmitRequest = async (newRequest) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/userrequest', newRequest);
            setRequests(prev => [...prev, response.data]);
            setShowRequestForm(false);
        } catch (error) {
            console.error('Error submitting request:', error);
            alert('Failed to submit the request. Please try again.');
        }
    };

    const handleCancelRequest = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/auth/userrequest/${id}`);
            setRequests(prev => prev.filter(req => req._id !== id));
        } catch (error) {
            console.error('Error canceling request:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <UserHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                {showRequestForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <NewRequestForm
                                onSubmit={handleSubmitRequest}
                                onCancel={() => setShowRequestForm(false)}
                            />
                        </div>
                    </div>
                )}

                <div className="mt-6">
                    {activeTab === 'requests' && (
                        <div className="space-y-6">
                            <div className="flex justify-left">
                                <button
                                    onClick={handleNewRequest}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    + New Request
                                </button>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">My Requests</h3>
                            <RequestList
                                requests={requests.filter(req => req.status !== 'Completed')}
                                onCancel={handleCancelRequest}
                            />
                        </div>
                    )}
                    {activeTab === 'history' && <HistoryTable requests={requests.filter(req => req.status === 'Completed')} />}
                    {activeTab === 'profile' && <ProfileSection />}
                </div>
            </main>
        </div>
    );
};

// ✅ New Request Form
const NewRequestForm = ({ onSubmit, onCancel }) => {
    const [requestType, setRequestType] = useState('Blood');
    const [formData, setFormData] = useState({
        name: '',
        neededBy: '',
        bloodType: '',
        organ: '',
        additionalInfo: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = {
            email: localStorage.getItem('email'),
            name: formData.name,
            neededBy: formData.neededBy,
            type: requestType,
            bloodType: requestType === 'Blood' ? formData.bloodType : '',
            organ: requestType === 'Organ' ? formData.organ : '',
            additionalInfo: formData.additionalInfo,
            status: 'Pending'
        };
        onSubmit(request);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-medium mb-4">Create New Request</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Needed By</label>
                <input
                    type="date"
                    name="neededBy"
                    value={formData.neededBy}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
                <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="Blood">Blood</option>
                    <option value="Organ">Organ</option>
                </select>
            </div>

            {requestType === 'Blood' ? (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                    <select
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
            ) : (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organ Needed</label>
                    <select
                        name="organ"
                        value={formData.organ}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Organ</option>
                        <option value="Kidney">Kidney</option>
                        <option value="Liver">Liver</option>
                        <option value="Heart">Heart</option>
                        <option value="Lung">Lung</option>
                    </select>
                </div>
            )}

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                />
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                >
                    Submit Request
                </button>
            </div>
        </form>
    );
};

// ✅ Request List Component
const RequestList = ({ requests, onCancel }) => (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {requests.length === 0 ? (
            <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
                No active requests found.
            </div>
        ) : (
            <ul className="divide-y divide-gray-200">
                {requests.map((request) => (
                    <li key={request._id} className="py-4 hover:bg-gray-50 transition-colors duration-150 gap-10">
                        <div className="px-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-blue-600 truncate">
                                    {request.type} Request ({request.bloodType || request.organ})
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                            request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {request.status}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500">
                                        Needed by: {request.neededBy || 'N/A'}
                                    </p>
                                </div>
                                <div className="mt-3 flex items-center text-sm text-gray-500 sm:mt-0 space-x-4">
                                    <button className="text-blue-600 hover:text-blue-800 hover:underline">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

// // Optional placeholder components:
// const HistoryTable = () => <div className="text-gray-600">History tab coming soon...</div>;
// const ProfileSection = () => <div className="text-gray-600">Profile section coming soon...</div>;

export default RecipientDashboard;
