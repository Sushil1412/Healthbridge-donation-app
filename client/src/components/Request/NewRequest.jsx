import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewRequest = () => {
    const [requestType, setRequestType] = useState('blood');
    const [formData, setFormData] = useState({
        bloodType: '',
        organType: '',
        urgency: 'normal',
        notes: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // API call would go here
        alert('Request submitted successfully!');
        navigate('/recipient-dashboard');
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">New Donation Request</h2>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                {/* Request Type Toggle */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={() => setRequestType('blood')}
                            className={`px-4 py-2 rounded-md ${requestType === 'blood' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Blood
                        </button>
                        <button
                            type="button"
                            onClick={() => setRequestType('organ')}
                            className={`px-4 py-2 rounded-md ${requestType === 'organ' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Organ
                        </button>
                    </div>
                </div>

                {/* Blood Request Fields */}
                {requestType === 'blood' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type Needed</label>
                        <select
                            value={formData.bloodType}
                            onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select blood type</option>
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

                {/* Organ Request Fields */}
                {requestType === 'organ' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Organ Needed</label>
                        <select
                            value={formData.organType}
                            onChange={(e) => setFormData({ ...formData, organType: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select organ</option>
                            <option value="Kidney">Kidney</option>
                            <option value="Liver">Liver</option>
                            <option value="Heart">Heart</option>
                            <option value="Lung">Lung</option>
                            <option value="Pancreas">Pancreas</option>
                        </select>
                    </div>
                )}

                {/* Common Fields */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
                    <select
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="normal">Normal (1-2 weeks)</option>
                        <option value="urgent">Urgent (3-5 days)</option>
                        <option value="critical">Critical (24-48 hours)</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Any special requirements or details..."
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/recipient-dashboard')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewRequest;