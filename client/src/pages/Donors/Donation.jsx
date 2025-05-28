import { useState } from 'react';
import DonorHeader from '../../components/Header/DonorHeader';

export default function OrganDonationForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        idNumber: '',
        bloodType: '',
        contactNumber: '',
        email: '',
        address: '',
        nextOfKin: '',
        nextOfKinContact: '',
        organsToDonate: [],
        consent: false
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleOrganSelection = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData(prev => ({
                ...prev,
                organsToDonate: [...prev.organsToDonate, value]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                organsToDonate: prev.organsToDonate.filter(organ => organ !== value)
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const organsList = [
        'Heart', 'Lungs', 'Liver', 'Kidneys', 'Pancreas',
        'Intestines', 'Corneas', 'Skin', 'Bone', 'Tendons'
    ];

    if (submitted) {


        return (
            <>
                <DonorHeader />
                <div className="max-w-2xl mx-auto p-6 bg-red-50 rounded-lg shadow-lg mt-10">
                    <h2 className="text-2xl font-bold text-red-800 mb-6">Thank You for Your Generous Decision</h2>
                    <p className="text-red-700 mb-6">Your organ donation registration has been received. Here are your details:</p>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <ul className="space-y-3">
                            <li className="border-b border-red-100 pb-2">
                                <span className="font-semibold text-red-700">Full Name:</span> {formData.fullName}
                            </li>
                            <li className="border-b border-red-100 pb-2">
                                <span className="font-semibold text-red-700">Date of Birth:</span> {formData.dateOfBirth}
                            </li>
                            <li className="border-b border-red-100 pb-2">
                                <span className="font-semibold text-red-700">ID Number:</span> {formData.idNumber}
                            </li>
                            <li className="border-b border-red-100 pb-2">
                                <span className="font-semibold text-red-700">Blood Type:</span> {formData.bloodType}
                            </li>
                            <li className="border-b border-red-100 pb-2">
                                <span className="font-semibold text-red-700">Contact Number:</span> {formData.contactNumber}
                            </li>
                            <li className="border-b border-red-100 pb-2">
                                <span className="font-semibold text-red-700">Email:</span> {formData.email}
                            </li>
                            <li className="border-b border-red-100 pb-2">
                                <span className="font-semibold text-red-700">Address:</span> {formData.address}
                            </li>
                            <li className="border-b border-red-100 pb-2">
                                <span className="font-semibold text-red-700">Next of Kin:</span> {formData.nextOfKin}
                            </li>
                            <li className="border-b border-red-100 pb-2">
                                <span className="font-semibold text-red-700">Next of Kin Contact:</span> {formData.nextOfKinContact}
                            </li>
                            <li className="border-b border-red-100 pb-2">
                                <span className="font-semibold text-red-700">Organs to Donate:</span> {formData.organsToDonate.join(', ')}
                            </li>
                        </ul>

                        <div className="mt-6">
                            <p className="text-red-700 font-semibold">Your decision to donate organs after death will save lives.</p>
                            <p className="text-red-600 mt-2">We recommend informing your family about this decision.</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (<>
        <DonorHeader />
        <div className="max-w-2xl mx-auto p-6 bg-red-50 rounded-lg shadow-lg mt-10">
            <h1 className="text-3xl font-bold text-red-800 mb-2">Organ Donation Registration</h1>
            <p className="text-red-700 mb-6">Register your decision to donate organs after death</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-red-700 font-bold mb-2" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-red-700 font-bold mb-2" htmlFor="dateOfBirth">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-red-700 font-bold mb-2" htmlFor="idNumber">
                            ID/Passport Number
                        </label>
                        <input
                            type="text"
                            id="idNumber"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-red-700 font-bold mb-2" htmlFor="bloodType">
                            Blood Type
                        </label>
                        <select
                            id="bloodType"
                            name="bloodType"
                            value={formData.bloodType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-red-700 font-bold mb-2" htmlFor="contactNumber">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-red-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-red-700 font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows="3"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-red-700 font-bold mb-2" htmlFor="nextOfKin">
                            Next of Kin
                        </label>
                        <input
                            type="text"
                            id="nextOfKin"
                            name="nextOfKin"
                            value={formData.nextOfKin}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-red-700 font-bold mb-2" htmlFor="nextOfKinContact">
                            Next of Kin Contact
                        </label>
                        <input
                            type="tel"
                            id="nextOfKinContact"
                            name="nextOfKinContact"
                            value={formData.nextOfKinContact}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-red-700 font-bold mb-4">Organs to Donate</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {organsList.map(organ => (
                            <div key={organ} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={organ}
                                    name="organsToDonate"
                                    value={organ}
                                    onChange={handleOrganSelection}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-red-300 rounded"
                                />
                                <label htmlFor={organ} className="ml-2 text-red-700">
                                    {organ}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            type="checkbox"
                            id="consent"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-red-300 rounded"
                            required
                        />
                    </div>
                    <div className="ml-3">
                        <label htmlFor="consent" className="text-red-700">
                            I hereby declare that I voluntarily consent to donate my organs after my death for the purpose of transplantation to save lives. I understand that this decision can be revoked at any time.
                        </label>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline text-lg"
                    >
                        Register as Organ Donor
                    </button>
                </div>
            </form>
        </div>
    </>
    );
}