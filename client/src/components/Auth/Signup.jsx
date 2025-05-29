import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        bloodGroup: '',
        aadhar: '',
        hospitalId: '',
        address: ''  // Added address field
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!formData.role) {
            setError('Please select a role');
            return;
        }

        setIsLoading(true);

        try {
            // Prepare the base payload
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                bloodGroup: '',
                aadhar: '',
                hospitalId: '',
                address: formData.address  // Include address in payload
            };

            // Add role-specific fields
            if (formData.role === 'donor' || formData.role === 'recipient') {
                if (!formData.bloodGroup) {
                    setError('Please select your blood group');
                    setIsLoading(false);
                    return;
                }
                if (!formData.aadhar) {
                    setError('Aadhar number is required');
                    setIsLoading(false);
                    return;
                }
                payload.bloodGroup = formData.bloodGroup;
                payload.aadhar = formData.aadhar;
            } else if (formData.role === 'hospital') {
                if (!formData.hospitalId) {
                    setError('Hospital ID is required');
                    setIsLoading(false);
                    return;
                }
                if (!formData.address) {
                    setError('Hospital address is required');
                    setIsLoading(false);
                    return;
                }
                payload.hospitalId = formData.hospitalId;
                payload.address = formData.address;
            }

            console.log('Sending payload:', payload); // For debugging

            const res = await axios.post('http://localhost:8000/api/auth/signup', payload);
            setMessage(res.data.message);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="text-xl font-bold text-red-600">
                            LifeShare
                        </Link>
                        <Link to="/" className="text-sm font-medium text-red-600 hover:text-red-700">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Join LifeShare as a recipient, donor, or hospital
                        </p>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            {/* Role Selection */}
                            <div className="grid grid-cols-3 gap-3">
                                {['recipient', 'donor', 'hospital'].map((role) => (
                                    <div key={role} className="col-span-1">
                                        <input
                                            id={`role-${role}`}
                                            name="role"
                                            type="radio"
                                            checked={formData.role === role}
                                            onChange={() => setFormData({ ...formData, role })}
                                            className="sr-only"
                                            required
                                        />
                                        <label
                                            htmlFor={`role-${role}`}
                                            className={`w-full flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium ${formData.role === role
                                                ? 'bg-red-100 border-red-300 text-red-700'
                                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="sr-only">Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                    placeholder="Full Name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>

                            {/* Blood Group (for donors/recipients) */}
                            {(formData.role === 'donor' || formData.role === 'recipient') && (
                                <div>
                                    <label htmlFor="bloodGroup" className="sr-only">Blood Group</label>
                                    <select
                                        id="bloodGroup"
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        required={formData.role === 'donor' || formData.role === 'recipient'}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
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
                                </div>
                            )}

                            {/* Hospital ID (for hospitals) */}
                            {formData.role === 'hospital' && (
                                <div>
                                    <label htmlFor="hospitalId" className="sr-only">Hospital ID</label>
                                    <input
                                        id="hospitalId"
                                        name="hospitalId"
                                        type="text"
                                        value={formData.hospitalId}
                                        onChange={handleChange}
                                        required={formData.role === 'hospital'}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                        placeholder="Hospital Registration ID"
                                    />
                                </div>
                            )}

                            {/* Address (for hospitals) */}
                            {formData.role === 'hospital' && (
                                <div>
                                    <label htmlFor="address" className="sr-only">Hospital Address</label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required={formData.role === 'hospital'}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                        placeholder="Hospital Full Address"
                                    />
                                </div>
                            )}

                            {/* Aadhar (for donors/recipients) */}
                            {(formData.role === 'donor' || formData.role === 'recipient') && (
                                <div>
                                    <label htmlFor="aadhar" className="sr-only">Aadhar Number</label>
                                    <input
                                        id="aadhar"
                                        name="aadhar"
                                        type="text"
                                        value={formData.aadhar}
                                        onChange={handleChange}
                                        required={formData.role === 'donor' || formData.role === 'recipient'}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                        placeholder="Aadhar Number"
                                    />
                                </div>
                            )}

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                    placeholder="Password (min 8 characters)"
                                    minLength="8"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm Password"
                                    minLength="8"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I agree to the <Link to="/terms" className="text-red-600 hover:text-red-500">Terms of Service</Link> and <Link to="/privacy" className="text-red-600 hover:text-red-500">Privacy Policy</Link>
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </>
                                ) : 'Create Account'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} LifeShare. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Signup;