import React, { useState } from 'react';
import HospitalHeader from '../../components/Header/HospitalHeader';

const BloodDonationPage = () => {
    const [bloodGroups, setBloodGroups] = useState([
        { type: 'A+', units: 5 },
        { type: 'A-', units: 3 },
        { type: 'B+', units: 7 },
        { type: 'B-', units: 2 },
        { type: 'AB+', units: 4 },
        { type: 'AB-', units: 1 },
        { type: 'O+', units: 8 },
        { type: 'O-', units: 2 },
    ]);

    const [selectedBlood, setSelectedBlood] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [requestDetails, setRequestDetails] = useState({
        name: '',
        contact: '',
        quantity: 1,
        urgency: 'normal',
    });

    const handleRequest = (bloodType) => {
        setSelectedBlood(bloodType);
        setShowRequestModal(true);
    };

    const handleSubmitRequest = (e) => {
        e.preventDefault();
        console.log('Request submitted:', {
            bloodType: selectedBlood,
            ...requestDetails
        });
        setShowRequestModal(false);
        setRequestDetails({
            name: '',
            contact: '',
            quantity: 1,
            urgency: 'normal',
        });
        alert('Your request has been sent to the administrator.');
    };

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
                                <button
                                    onClick={() => handleRequest(group.type)}
                                    className="mt-2 self-end  hover:bg-red-100 text-red-600 rounded-full p-2 transition-colors duration-200"
                                    aria-label={`Request ${group.type} blood`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
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
            </div>
        </>
    );
};

export default BloodDonationPage;