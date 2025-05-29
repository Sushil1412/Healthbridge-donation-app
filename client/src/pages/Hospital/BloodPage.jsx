import React, { useState, useEffect } from 'react';
import HospitalHeader from '../../components/Header/HospitalHeader';
import axios from 'axios';


const BloodDonationPage = () => {
    const [bloodGroups, setBloodGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBlood, setSelectedBlood] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateAmount, setUpdateAmount] = useState(1);
    const [requestDetails, setRequestDetails] = useState({
        name: '',
        quantity: 1,
        urgency: 'normal',
    });
    const [hospitalEmail, setHospitalEmail] = useState('');

    // Get hospital email from local storage
    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            setHospitalEmail(email);
        }
    }, []);

    // Fetch blood inventory data from API
    useEffect(() => {
        const fetchBloodInventory = async () => {
            if (!hospitalEmail) return;

            try {
                const response = await axios.get('/api/auth/hospitalinventory', {
                    body: {
                        hospitalEmail: hospitalEmail
                    }
                });

                const transformedData = response.data.map(item => ({
                    type: item.bloodType,
                    units: item.units
                }));
                setBloodGroups(transformedData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching blood inventory:', err);
            }
        };

        fetchBloodInventory();
    }, [hospitalEmail]);

    const handleRequest = (bloodType) => {
        setSelectedBlood(bloodType);
        setShowRequestModal(true);
    };

    const handleUpdate = (bloodType) => {
        setSelectedBlood(bloodType);
        setShowUpdateModal(true);
    };

    const handleSubmitRequest = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/bloodrequest', {
                hospitalEmail: hospitalEmail,
                bloodType: selectedBlood,
                ...requestDetails
            });
            setShowRequestModal(false);
            setRequestDetails({
                name: '',
                quantity: 1,
                urgency: 'normal',
            });
            alert('Your request has been sent to the administrator.');
        } catch (err) {
            console.error('Error submitting blood request:', err);
            alert('Failed to submit request. Please try again.');
        }
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.patch('/api/auth/inventoryupdate', {
                hospitalEmail: hospitalEmail,
                bloodType: selectedBlood,
                units: parseInt(updateAmount)
            });

            // Optimistically update the UI
            const updatedBloodGroups = bloodGroups.map(group => {
                if (group.type === selectedBlood) {
                    return {
                        ...group,
                        units: Math.max(0, group.units + parseInt(updateAmount))
                    };
                }
                return group;
            });

            setBloodGroups(updatedBloodGroups);
            setShowUpdateModal(false);
            setUpdateAmount(1);
            alert('Blood inventory updated successfully!');
        } catch (err) {
            console.error('Error updating inventory:', err);
            alert('Failed to update inventory. Please try again.');
        }
    };




    if (loading) {
        return (
            <>
                <HospitalHeader />
                <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-700">Loading blood inventory...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <HospitalHeader />
                <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                        <div className="text-red-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <HospitalHeader />
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Blood Inventory</h1>

                    {/* Blood Availability Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {bloodGroups.map((group, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-2xl font-semibold text-gray-700">{group.type}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${group.units > 3 ? 'bg-green-100 text-green-800' :
                                            group.units > 0 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {group.units} units
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <button
                                        onClick={() => handleUpdate(group.type)}
                                        className="hover:bg-blue-100 text-blue-600 rounded-full p-2 transition-colors duration-200"
                                        aria-label={`Update ${group.type} blood stock`}
                                        title="Update stock"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleRequest(group.type)}
                                        className="hover:bg-red-100 text-red-600 rounded-full p-2 transition-colors duration-200"
                                        aria-label={`Request ${group.type} blood`}
                                        title="Request from admin"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Request Modal */}
                {showRequestModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Blood ({selectedBlood})</h2>

                            <form onSubmit={handleSubmitRequest}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="name">
                                        Requester Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                        value={requestDetails.name}
                                        onChange={(e) => setRequestDetails({ ...requestDetails, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="contact">
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="contact"
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                        value={requestDetails.contact}
                                        onChange={(e) => setRequestDetails({ ...requestDetails, contact: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="quantity">
                                        Units Needed
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        min="1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                        value={requestDetails.quantity}
                                        onChange={(e) => setRequestDetails({ ...requestDetails, quantity: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 mb-2" htmlFor="urgency">
                                        Urgency Level
                                    </label>
                                    <select
                                        id="urgency"
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                        value={requestDetails.urgency}
                                        onChange={(e) => setRequestDetails({ ...requestDetails, urgency: e.target.value })}
                                    >
                                        <option value="normal">Normal (3+ days)</option>
                                        <option value="urgent">Urgent (within 24 hours)</option>
                                        <option value="emergency">Emergency (immediate need)</option>
                                    </select>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowRequestModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Send Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Update Modal */}
                {showUpdateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Blood Stock ({selectedBlood})</h2>

                            <form onSubmit={handleSubmitUpdate}>
                                <div className="mb-6">
                                    <label className="block text-gray-700 mb-2" htmlFor="updateAmount">
                                        Amount to Add/Remove
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setUpdateAmount(prev => Math.max(1, prev - 1))}
                                            className="px-3 py-1 border border-gray-300 rounded-l bg-gray-100 hover:bg-gray-200"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            id="updateAmount"
                                            className="w-full px-3 py-2 border-t border-b border-gray-300 text-center"
                                            value={updateAmount}
                                            onChange={(e) => setUpdateAmount(parseInt(e.target.value) || 1)}
                                            min="1"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setUpdateAmount(prev => prev + 1)}
                                            className="px-3 py-1 border border-gray-300 rounded-r bg-gray-100 hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Use negative numbers to remove units (e.g., -2)
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowUpdateModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Update Stock
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BloodDonationPage;