import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import UserHeader from '../Header/UserHeader';

const UserProfile = () => {
    const { currentUser, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bloodGroup: '',
        address: '',
        mobile: '',
        aadhar: '',
        emergencyContact: '',
        medicalHistory: ''
    });

    // Initialize form data
    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || '',
                email: currentUser.email || '',
                bloodGroup: currentUser.bloodGroup || '',
                address: currentUser.address || '',
                mobile: currentUser.mobile || '',
                aadhar: currentUser.aadhar || '',
                emergencyContact: currentUser.emergencyContact || '',
                medicalHistory: currentUser.medicalHistory || ''
            });
            setPreviewImage(currentUser.photoURL || '');
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser({
                ...formData,
                photoURL: previewImage
            });
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Error updating profile: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <UserHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-8 text-white">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl text-red-600 font-bold">
                                            {formData.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                {isEditing && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <label className="cursor-pointer">
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </label>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-8 text-center md:text-left">
                                <h1 className="text-2xl font-bold">{formData.name}</h1>
                                <p className="mt-1">{formData.email}</p>
                                <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-white bg-opacity-20">
                                    <span className="h-2 w-2 rounded-full bg-white mr-2"></span>
                                    <span className="text-sm font-medium">Blood Group: {formData.bloodGroup || 'Not specified'}</span>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-auto">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-white text-red-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="px-4 py-2 bg-white text-red-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="px-6 py-8">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                                    {isEditing ? (
                                        <select
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            <option value="">Select Blood Group</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    ) : (
                                        <p className="text-gray-900">{formData.bloodGroup || 'Not specified'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.mobile || 'Not specified'}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    {isEditing ? (
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900 whitespace-pre-line">{formData.address || 'Not specified'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card Number</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="aadhar"
                                            value={formData.aadhar}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.aadhar || 'Not specified'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.emergencyContact || 'Not specified'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
                                    {isEditing ? (
                                        <textarea
                                            name="medicalHistory"
                                            value={formData.medicalHistory}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                            placeholder="Any allergies, chronic conditions, etc."
                                        />
                                    ) : (
                                        <p className="text-gray-900 whitespace-pre-line">{formData.medicalHistory || 'Not specified'}</p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserProfile;