import React, { useState } from 'react';
import HospitalHeader from '../../components/Header/HospitalHeader';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const BloodAppointmentPage = () => {
    // Sample data for blood requests (from recipients)
    const [bloodRequests, setBloodRequests] = useState([
        {
            id: 1,
            patientName: 'John Smith',
            bloodType: 'A+',
            units: 2,
            urgency: 'Urgent',
            hospital: 'City General',
            contact: '555-0101',
            status: 'Pending',
            date: '2023-06-15',
            type: 'recipient',
            notes: 'Patient requires blood for upcoming surgery'
        },
        {
            id: 2,
            patientName: 'Maria Garcia',
            bloodType: 'O-',
            units: 1,
            urgency: 'Emergency',
            hospital: 'Central Hospital',
            contact: '555-0102',
            status: 'Approved',
            date: '2023-06-16',
            type: 'recipient',
            notes: 'Emergency transfusion needed'
        },
        {
            id: 3,
            patientName: 'David Wilson',
            bloodType: 'B+',
            units: 3,
            urgency: 'Normal',
            hospital: 'Westside Medical',
            contact: '555-0103',
            status: 'Pending',
            date: '2023-06-18',
            type: 'recipient',
            notes: 'Regular blood transfusion'
        }
    ]);

    // Sample data for donor appointments
    const [donorAppointments, setDonorAppointments] = useState([
        {
            id: 101,
            donorName: 'Robert Johnson',
            bloodType: 'B+',
            units: 1,
            contact: '555-0201',
            status: 'Scheduled',
            date: '2023-06-17',
            time: '10:00 AM',
            type: 'donor',
            donationType: 'Whole Blood',
            lastDonation: '2023-01-15'
        },
        {
            id: 102,
            donorName: 'Sarah Williams',
            bloodType: 'AB-',
            units: 1,
            contact: '555-0202',
            status: 'Completed',
            date: '2023-06-14',
            time: '02:30 PM',
            type: 'donor',
            donationType: 'Plasma',
            lastDonation: '2022-11-20'
        },
        {
            id: 103,
            donorName: 'Michael Brown',
            bloodType: 'O+',
            units: 1,
            contact: '555-0203',
            status: 'Scheduled',
            date: '2023-06-19',
            time: '11:00 AM',
            type: 'donor',
            donationType: 'Whole Blood',
            lastDonation: '2023-03-10'
        }
    ]);

    // UI State
    const [activeTab, setActiveTab] = useState('requests');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [action, setAction] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [calendarView, setCalendarView] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showNewDonorModal, setShowNewDonorModal] = useState(false);
    const [newDonor, setNewDonor] = useState({
        donorName: '',
        bloodType: '',
        contact: '',
        date: '',
        time: '',
        donationType: 'Whole Blood'
    });

    // Filter functions
    const filteredBloodRequests = bloodRequests.filter(request => {
        const matchesSearch = request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.hospital.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || request.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const filteredDonorAppointments = donorAppointments.filter(donor => {
        const matchesSearch = donor.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || donor.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    // Calendar events
    const donorEvents = donorAppointments.map(donor => ({
        id: donor.id,
        title: `${donor.donorName} (${donor.bloodType})`,
        start: new Date(`${donor.date}T${donor.time.replace(' AM', '').replace(' PM', '')}`),
        end: new Date(`${donor.date}T${parseInt(donor.time) + 1}:00:00`),
        status: donor.status
    }));

    // Stats summary
    const bloodRequestStats = {
        total: bloodRequests.length,
        pending: bloodRequests.filter(r => r.status === 'Pending').length,
        approved: bloodRequests.filter(r => r.status === 'Approved').length,
        rejected: bloodRequests.filter(r => r.status === 'Rejected').length
    };

    const donorStats = {
        total: donorAppointments.length,
        scheduled: donorAppointments.filter(d => d.status === 'Scheduled').length,
        completed: donorAppointments.filter(d => d.status === 'Completed').length,
        cancelled: donorAppointments.filter(d => d.status === 'Cancelled').length
    };

    // Handlers
    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setShowDetailsModal(true);
    };

    const handleAction = (actionType) => {
        setAction(actionType);
        if (selectedRequest.type === 'recipient') {
            setBloodRequests(bloodRequests.map(req =>
                req.id === selectedRequest.id ? { ...req, status: actionType === 'approve' ? 'Approved' : 'Rejected' } : req
            ));
        } else {
            setDonorAppointments(donorAppointments.map(donor =>
                donor.id === selectedRequest.id ? { ...donor, status: actionType === 'complete' ? 'Completed' : donor.status } : donor
            ));
        }
        setShowDetailsModal(false);
        alert(`Request ${actionType === 'approve' ? 'approved' : actionType === 'reject' ? 'rejected' : 'marked as completed'} successfully`);
    };

    const handleAddNewDonor = (e) => {
        e.preventDefault();
        const newId = Math.max(...donorAppointments.map(d => d.id)) + 1;
        setDonorAppointments([
            ...donorAppointments,
            {
                id: newId,
                donorName: newDonor.donorName,
                bloodType: newDonor.bloodType,
                contact: newDonor.contact,
                status: 'Scheduled',
                date: newDonor.date,
                time: newDonor.time,
                type: 'donor',
                donationType: newDonor.donationType,
                units: 1
            }
        ]);
        setShowNewDonorModal(false);
        setNewDonor({
            donorName: '',
            bloodType: '',
            contact: '',
            date: '',
            time: '',
            donationType: 'Whole Blood'
        });
        alert('New donor appointment scheduled successfully');
    };

    const eventStyleGetter = (event) => {
        let backgroundColor = '#3182ce'; // blue for scheduled
        if (event.status === 'Completed') backgroundColor = '#38a169'; // green
        if (event.status === 'Cancelled') backgroundColor = '#e53e3e'; // red

        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    };

    return (
        <>
            <HospitalHeader />
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Blood Appointment Management</h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-gray-500">Total Requests</h3>
                            <p className="text-2xl font-bold">{bloodRequestStats.total}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-gray-500">Pending Requests</h3>
                            <p className="text-2xl font-bold text-yellow-600">{bloodRequestStats.pending}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-gray-500">Approved Requests</h3>
                            <p className="text-2xl font-bold text-green-600">{bloodRequestStats.approved}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-gray-500">Scheduled Donations</h3>
                            <p className="text-2xl font-bold text-blue-600">{donorStats.scheduled}</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* Tabs */}
                            <div className="flex border-b border-gray-200">
                                <button
                                    className={`py-2 px-4 font-medium ${activeTab === 'requests' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab('requests')}
                                >
                                    Blood Requests ({bloodRequests.length})
                                </button>
                                <button
                                    className={`py-2 px-4 font-medium ${activeTab === 'donors' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab('donors')}
                                >
                                    Donor Appointments ({donorAppointments.length})
                                </button>
                            </div>

                            {/* Search and Filter */}
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="px-3 py-2 border border-gray-300 rounded"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <select
                                    className="px-3 py-2 border border-gray-300 rounded"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">All Statuses</option>
                                    {activeTab === 'requests' ? (
                                        <>
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="scheduled">Scheduled</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </>
                                    )}
                                </select>
                                {activeTab === 'donors' && (
                                    <button
                                        onClick={() => setCalendarView(!calendarView)}
                                        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        {calendarView ? 'List View' : 'Calendar View'}
                                    </button>
                                )}
                                {activeTab === 'donors' && (
                                    <button
                                        onClick={() => setShowNewDonorModal(true)}
                                        className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        New Donor
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Requests Table */}
                    {activeTab === 'requests' && (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredBloodRequests.length > 0 ? (
                                        filteredBloodRequests.map((request) => (
                                            <tr key={request.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">{request.patientName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        {request.bloodType}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{request.units}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.urgency === 'Emergency' ? 'bg-red-100 text-red-800' :
                                                        request.urgency === 'Urgent' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-green-100 text-green-800'
                                                        }`}>
                                                        {request.urgency}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{request.hospital}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                        request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {request.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleViewDetails(request)}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        View
                                                    </button>
                                                    {request.status === 'Pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedRequest(request);
                                                                    handleAction('approve');
                                                                }}
                                                                className="text-green-600 hover:text-green-900 mr-3"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedRequest(request);
                                                                    handleAction('reject');
                                                                }}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                                No blood requests found matching your criteria
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Donors Table or Calendar */}
                    {activeTab === 'donors' && !calendarView && (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredDonorAppointments.length > 0 ? (
                                        filteredDonorAppointments.map((donor) => (
                                            <tr key={donor.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">{donor.donorName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        {donor.bloodType}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{donor.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{donor.time}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{donor.donationType}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${donor.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        donor.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {donor.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleViewDetails(donor)}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        View
                                                    </button>
                                                    {donor.status === 'Scheduled' && (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedRequest(donor);
                                                                handleAction('complete');
                                                            }}
                                                            className="text-green-600 hover:text-green-900"
                                                        >
                                                            Complete
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                                No donor appointments found matching your criteria
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Calendar View */}
                    {activeTab === 'donors' && calendarView && (
                        <div className="bg-white p-4 rounded-lg shadow">
                            <Calendar
                                localizer={localizer}
                                events={donorEvents}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 600 }}
                                onSelectEvent={(event) => {
                                    const donor = donorAppointments.find(d => d.id === event.id);
                                    handleViewDetails(donor);
                                }}
                                eventPropGetter={eventStyleGetter}
                                defaultView="week"
                                views={['month', 'week', 'day', 'agenda']}
                            />
                        </div>
                    )}

                    {/* Details Modal */}
                    {showDetailsModal && selectedRequest && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    {selectedRequest.type === 'recipient' ? 'Blood Request Details' : 'Donor Appointment Details'}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                            {selectedRequest.type === 'recipient' ? 'Patient Information' : 'Donor Information'}
                                        </h3>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Name:</span> {selectedRequest.type === 'recipient' ? selectedRequest.patientName : selectedRequest.donorName}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Contact:</span> {selectedRequest.contact}
                                        </p>
                                        {selectedRequest.type === 'recipient' ? (
                                            <p className="text-gray-600">
                                                <span className="font-medium">Hospital:</span> {selectedRequest.hospital}
                                            </p>
                                        ) : (
                                            <p className="text-gray-600">
                                                <span className="font-medium">Last Donation:</span> {selectedRequest.lastDonation}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Blood Information</h3>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Blood Type:</span>
                                            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                {selectedRequest.bloodType}
                                            </span>
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Units:</span> {selectedRequest.units}
                                        </p>
                                        {selectedRequest.type === 'recipient' ? (
                                            <p className="text-gray-600">
                                                <span className="font-medium">Urgency:</span>
                                                <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedRequest.urgency === 'Emergency' ? 'bg-red-100 text-red-800' :
                                                    selectedRequest.urgency === 'Urgent' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'
                                                    }`}>
                                                    {selectedRequest.urgency}
                                                </span>
                                            </p>
                                        ) : (
                                            <>
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Donation Type:</span> {selectedRequest.donationType}
                                                </p>
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Date:</span> {selectedRequest.date}
                                                </p>
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Time:</span> {selectedRequest.time}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {selectedRequest.type === 'recipient' && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Notes</h3>
                                        <p className="text-gray-600">{selectedRequest.notes}</p>
                                    </div>
                                )}

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowDetailsModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                                    >
                                        Close
                                    </button>
                                    {selectedRequest.type === 'recipient' && selectedRequest.status === 'Pending' && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleAction('approve')}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleAction('reject')}
                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {selectedRequest.type === 'donor' && selectedRequest.status === 'Scheduled' && (
                                        <button
                                            type="button"
                                            onClick={() => handleAction('complete')}
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Mark as Completed
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* New Donor Modal */}
                    {showNewDonorModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedule New Donor</h2>

                                <form onSubmit={handleAddNewDonor}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="donorName">
                                            Donor Name
                                        </label>
                                        <input
                                            type="text"
                                            id="donorName"
                                            className="w-full px-3 py-2 border border-gray-300 rounded"
                                            value={newDonor.donorName}
                                            onChange={(e) => setNewDonor({ ...newDonor, donorName: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="bloodType">
                                            Blood Type
                                        </label>
                                        <select
                                            id="bloodType"
                                            className="w-full px-3 py-2 border border-gray-300 rounded"
                                            value={newDonor.bloodType}
                                            onChange={(e) => setNewDonor({ ...newDonor, bloodType: e.target.value })}
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

                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="contact">
                                            Contact Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="contact"
                                            className="w-full px-3 py-2 border border-gray-300 rounded"
                                            value={newDonor.contact}
                                            onChange={(e) => setNewDonor({ ...newDonor, contact: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="donationType">
                                            Donation Type
                                        </label>
                                        <select
                                            id="donationType"
                                            className="w-full px-3 py-2 border border-gray-300 rounded"
                                            value={newDonor.donationType}
                                            onChange={(e) => setNewDonor({ ...newDonor, donationType: e.target.value })}
                                            required
                                        >
                                            <option value="Whole Blood">Whole Blood</option>
                                            <option value="Plasma">Plasma</option>
                                            <option value="Platelets">Platelets</option>
                                            <option value="Double Red Cells">Double Red Cells</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-gray-700 mb-2" htmlFor="date">
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                id="date"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                value={newDonor.date}
                                                onChange={(e) => setNewDonor({ ...newDonor, date: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2" htmlFor="time">
                                                Time
                                            </label>
                                            <input
                                                type="time"
                                                id="time"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                value={newDonor.time}
                                                onChange={(e) => setNewDonor({ ...newDonor, time: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowNewDonorModal(false)}
                                            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Schedule Donor
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BloodAppointmentPage;