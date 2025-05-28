import React, { useState } from 'react';
import AdminHeader from '../../components/Header/AdminHeader';
const OrganDonor = () => {
    // Sample donor data
    const donorsData = [
        {
            id: 1,
            name: 'John Smith',
            age: 32,
            bloodType: 'O+',
            organs: ['Kidney', 'Liver'],
            status: 'alive',
            contact: 'john.smith@example.com',
            location: 'New York',
            registrationDate: '2023-01-15',
            medicalHistory: 'No significant medical history'
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            age: 45,
            bloodType: 'A-',
            organs: ['Cornea', 'Pancreas'],
            status: 'alive',
            contact: 'sarah.j@example.com',
            location: 'Chicago',
            registrationDate: '2022-11-20',
            medicalHistory: 'Type 2 diabetes (controlled)'
        },
        {
            id: 3,
            name: 'Michael Brown',
            age: 28,
            bloodType: 'B+',
            organs: ['Heart', 'Lungs'],
            status: 'alive',
            contact: 'michael.b@example.com',
            location: 'Los Angeles',
            registrationDate: '2023-03-10',
            medicalHistory: 'None'
        },
        {
            id: 4,
            name: 'Robert Wilson',
            age: 60,
            bloodType: 'AB+',
            organs: ['Kidney', 'Liver', 'Cornea'],
            status: 'deceased',
            donationDate: '2023-02-28',
            recipient: 'David Miller (Kidney)',
            hospital: 'City General Hospital',
            causeOfDeath: 'Traumatic brain injury'
        },
        {
            id: 5,
            name: 'Emily Davis',
            age: 22,
            bloodType: 'O-',
            organs: ['Heart', 'Liver', 'Kidneys'],
            status: 'deceased',
            donationDate: '2022-12-15',
            recipient: 'Multiple recipients',
            hospital: 'Red Cross Medical Center',
            causeOfDeath: 'Car accident'
        }
    ];

    // State for active tab
    const [activeTab, setActiveTab] = useState('living');
    const [searchTerm, setSearchTerm] = useState('');

    // Filter donors based on status and search term
    const filteredDonors = donorsData.filter(donor => {
        const matchesStatus = donor.status === activeTab;
        const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.location?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <>
            <AdminHeader />
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-red-700 mb-2">Organ Donor Registry</h1>
                        <p className="text-gray-600">
                            {activeTab === 'living'
                                ? 'Living donors currently registered in our system'
                                : 'Honoring those who gave the gift of life'}
                        </p>
                    </div>

                    {/* Search and Tabs */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        {/* Search Bar */}
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder={`Search ${activeTab} donors...`}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200">
                            <button
                                className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'living'
                                    ? 'border-b-2 border-red-500 text-red-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                onClick={() => {
                                    setActiveTab('living');
                                    setSearchTerm('');
                                }}
                            >
                                Living Donors
                            </button>
                            <button
                                className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'deceased'
                                    ? 'border-b-2 border-red-500 text-red-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                onClick={() => {
                                    setActiveTab('deceased');
                                    setSearchTerm('');
                                }}
                            >
                                Deceased Donors
                            </button>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4">
                        <p className="text-gray-600">
                            Showing <span className="font-bold text-red-700">{filteredDonors.length}</span> {filteredDonors.length === 1 ? 'donor' : 'donors'}
                        </p>
                    </div>

                    {/* Donors List */}
                    {activeTab === 'living' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDonors.map(donor => (
                                <div key={donor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
                                    <div className="p-6">
                                        {/* Donor Header */}
                                        <div className="mb-4">
                                            <h2 className="text-xl font-bold text-gray-800">{donor.name}</h2>
                                            <div className="flex items-center mt-1">
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-2">
                                                    {donor.bloodType}
                                                </span>
                                                <span className="text-gray-600 text-sm">{donor.age} years</span>
                                            </div>
                                        </div>

                                        {/* Donor Info */}
                                        <div className="mb-4">
                                            <p className="text-gray-600 mb-2">
                                                <span className="font-medium">Location:</span> {donor.location}
                                            </p>
                                            <p className="text-gray-600 mb-2">
                                                <span className="font-medium">Contact:</span> {donor.contact}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-medium">Registered:</span> {new Date(donor.registrationDate).toLocaleDateString()}
                                            </p>
                                        </div>

                                        {/* Organs */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Pledged Organs:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {donor.organs.map(organ => (
                                                    <span key={organ} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                                                        {organ}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Medical History */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Medical History:</h4>
                                            <p className="text-gray-600 text-sm">{donor.medicalHistory}</p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-between mt-6">
                                            <button className="text-green-600 font-medium hover:text-green-800 transition-colors">
                                                View Profile
                                            </button>
                                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                                Contact Donor
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredDonors.map(donor => (
                                <div key={donor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
                                    <div className="p-6">
                                        {/* Donor Header */}
                                        <div className="mb-4">
                                            <h2 className="text-xl font-bold text-gray-800">{donor.name}</h2>
                                            <div className="flex items-center mt-1">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mr-2">
                                                    {donor.bloodType}
                                                </span>
                                                <span className="text-gray-600 text-sm">{donor.age} years at time of donation</span>
                                            </div>
                                        </div>

                                        {/* Donation Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-gray-600 mb-2">
                                                    <span className="font-medium">Donation Date:</span> {new Date(donor.donationDate).toLocaleDateString()}
                                                </p>
                                                <p className="text-gray-600 mb-2">
                                                    <span className="font-medium">Hospital:</span> {donor.hospital}
                                                </p>
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Cause of Death:</span> {donor.causeOfDeath}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 mb-2">
                                                    <span className="font-medium">Recipient(s):</span> {donor.recipient}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Organs Donated */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Organs Donated:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {donor.organs.map(organ => (
                                                    <span key={organ} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                                                        {organ}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Memorial Button */}
                                        <div className="flex justify-end mt-6">
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                                Light a Candle
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* No Results */}
                    {filteredDonors.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-lg shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">
                                {activeTab === 'living' ? 'No living donors found' : 'No deceased donors found'}
                            </h3>
                            <p className="text-gray-500">Try adjusting your search term</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrganDonor;