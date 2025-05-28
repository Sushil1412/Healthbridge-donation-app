import React, { useState } from 'react';
import HospitalHeader from '../../components/Header/HospitalHeader';

const OrganPage = () => {
    const [organs, setOrgans] = useState([
        { type: 'Heart', units: 2 },
        { type: 'Kidney', units: 5 },
        { type: 'Liver', units: 3 },
        { type: 'Lung', units: 1 },
        { type: 'Pancreas', units: 2 },
        { type: 'Cornea', units: 8 },
        { type: 'Skin', units: 10 },
        { type: 'Bone Marrow', units: 6 },
    ]);

    const [selectedOrgan, setSelectedOrgan] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [requestDetails, setRequestDetails] = useState({
        name: '',
        contact: '',
        urgency: 'normal',
    });

    const handleRequest = (organType) => {
        setSelectedOrgan(organType);
        setShowRequestModal(true);
    };

    const handleSubmitRequest = (e) => {
        e.preventDefault();
        console.log('Request submitted:', {
            organType: selectedOrgan,
            ...requestDetails
        });
        setShowRequestModal(false);
        setRequestDetails({
            name: '',
            contact: '',
            urgency: 'normal',
        });
        alert('Your request has been sent to the administrator.');
    };

    return (
        <>
            <HospitalHeader />
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Organ Inventory</h1>

                    {/* Organ Availability Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {organs.map((organ, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                                onClick={() => handleRequest(organ.type)}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-semibold text-gray-700">{organ.type}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${organ.units > 3 ? 'bg-green-100 text-green-800' :
                                            organ.units > 0 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {organ.units} available
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Request Modal */}
                {showRequestModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Organ ({selectedOrgan})</h2>

                            <form onSubmit={handleSubmitRequest}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="name">
                                        Patient Name
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
                                        <option value="normal">Normal (3+ months)</option>
                                        <option value="urgent">Urgent (within 1 month)</option>
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

export default OrganPage;