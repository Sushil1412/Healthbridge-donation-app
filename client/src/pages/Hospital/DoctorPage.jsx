import React, { useState } from 'react';
import HospitalHeader from '../../components/Header/HospitalHeader';

const DoctorPage = () => {
    const [doctors, setDoctors] = useState([
        { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', available: true },
        { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', available: true },
        { id: 3, name: 'Dr. Emily Wilson', specialty: 'Pediatrics', available: false },
        { id: 4, name: 'Dr. Robert Garcia', specialty: 'Orthopedics', available: true },
        { id: 5, name: 'Dr. Priya Patel', specialty: 'Dermatology', available: true },
        { id: 6, name: 'Dr. James Thompson', specialty: 'Oncology', available: false },
        { id: 7, name: 'Dr. Lisa Zhang', specialty: 'Gynecology', available: true },
        { id: 8, name: 'Dr. David Kim', specialty: 'General Surgery', available: true },
    ]);

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({
        patientName: '',
        contactNumber: '',
        date: '',
        time: '',
        reason: ''
    });

    const handleBookAppointment = (doctor) => {
        if (!doctor.available) return;
        setSelectedDoctor(doctor);
        setShowAppointmentModal(true);
    };

    const handleSubmitAppointment = (e) => {
        e.preventDefault();
        console.log('Appointment booked:', {
            doctor: selectedDoctor,
            ...appointmentDetails
        });
        setShowAppointmentModal(false);
        setAppointmentDetails({
            patientName: '',
            contactNumber: '',
            date: '',
            time: '',
            reason: ''
        });
        alert('Your appointment request has been submitted successfully.');
    };

    return (
        <>
            <HospitalHeader />
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Available Doctors</h1>

                    {/* Doctors Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className={`bg-white rounded-lg shadow-sm p-5 flex flex-col ${!doctor.available ? 'opacity-70' : 'hover:shadow-md transition-shadow duration-200'}`}
                            >
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                                    <p className="text-gray-600 mb-3">{doctor.specialty}</p>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${doctor.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {doctor.available ? 'Available' : 'Not Available'}
                                    </span>
                                </div>

                                {doctor.available && (
                                    <button
                                        onClick={() => handleBookAppointment(doctor)}
                                        className="mt-4 self-end bg-white-600 hover:bg-red-100 text-red-600 rounded-full p-2 transition-colors duration-200"
                                        aria-label={`Book appointment with ${doctor.name}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Appointment Modal */}
                {showAppointmentModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Book Appointment with {selectedDoctor?.name}
                            </h2>
                            <p className="text-gray-600 mb-4">{selectedDoctor?.specialty}</p>

                            <form onSubmit={handleSubmitAppointment}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="patientName">
                                        Patient Name
                                    </label>
                                    <input
                                        type="text"
                                        id="patientName"
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                        value={appointmentDetails.patientName}
                                        onChange={(e) => setAppointmentDetails({ ...appointmentDetails, patientName: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="contactNumber">
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="contactNumber"
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                        value={appointmentDetails.contactNumber}
                                        onChange={(e) => setAppointmentDetails({ ...appointmentDetails, contactNumber: e.target.value })}
                                        required
                                    />
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
                                            value={appointmentDetails.date}
                                            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, date: e.target.value })}
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
                                            value={appointmentDetails.time}
                                            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, time: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 mb-2" htmlFor="reason">
                                        Reason for Visit
                                    </label>
                                    <textarea
                                        id="reason"
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                        rows="3"
                                        value={appointmentDetails.reason}
                                        onChange={(e) => setAppointmentDetails({ ...appointmentDetails, reason: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAppointmentModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Book Appointment
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

export default DoctorPage;