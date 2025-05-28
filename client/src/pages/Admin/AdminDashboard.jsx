import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/Header/AdminHeader';

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Recent activity data
    const recentActivities = [
        {
            id: 1,
            type: 'Donor Registration',
            name: 'John Doe',
            date: '2023-06-15 14:30',
            status: 'Approved',
            icon: '👤'
        },
        {
            id: 2,
            type: 'Appointment Scheduled',
            name: 'City General Hospital',
            date: '2023-06-14 10:15',
            status: 'Completed',
            icon: '🏥'
        },
        {
            id: 3,
            type: 'Blood Donation',
            name: 'Jane Smith (A+)',
            date: '2023-06-13 09:45',
            status: 'Recorded',
            icon: '💉'
        },
        {
            id: 4,
            type: 'User Request',
            name: 'Michael Johnson',
            date: '2023-06-12 16:20',
            status: 'Approved',
            icon: '✅'
        },
        {
            id: 5,
            type: 'Organ Donation Pledge',
            name: 'Sarah Williams (Kidney)',
            date: '2023-06-11 11:30',
            status: 'Registered',
            icon: '❤️'
        }
    ];

    const cards = [
        {
            title: 'Hospitals',
            count: 24,
            description: 'Manage hospital registrations',
            path: '/Admin/hospital',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            title: 'Blood Donors',
            count: 156,
            description: 'View and manage blood donors',
            path: '/Admin/blood',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            )
        },
        {
            title: 'Organ Donors',
            count: 42,
            description: 'View and manage organ donors',
            path: '/admin/organ',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        }
    ];

    return (
        <>
            <AdminHeader />
            <div className="min-h-screen bg-gray-50 p-6 md:p-10">
                {/* Cards Section */}
                <div className="ml-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {cards.map((card) => (
                            <div
                                key={card.title}
                                onClick={() => navigate(card.path)}
                                className="bg-white rounded-lg shadow-sm p-4 transition-all duration-200 cursor-pointer 
                                           hover:shadow-md hover:-translate-y-1 active:translate-y-0
                                           group w-64"
                            >
                                <div className="flex flex-col items-center text-center h-full">
                                    <div className="mb-2 text-red-600 group-hover:text-red-700">
                                        {card.icon}
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-red-700">
                                        {card.title}
                                    </h2>
                                    <p className="text-2xl font-bold text-red-700 my-1">
                                        {card.count}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-auto">
                                        {card.description}
                                    </p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="mt-10 ml-20 mr-20">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-start border-b pb-4 last:border-b-0">
                                    <div className="text-2xl mr-4">{activity.icon}</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium text-gray-800">{activity.type}</h3>
                                            <span className={`text-sm px-2 py-1 rounded ${activity.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                activity.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {activity.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">{activity.name}</p>
                                        <p className="text-sm text-gray-500">{activity.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => navigate('/admin/activities')}
                            className="mt-4 text-red-600 hover:text-red-700 font-medium"
                        >
                            View All Activities →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;