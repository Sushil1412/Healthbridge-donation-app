import UserHeader from "../components/Header/UserHeader";


const About = () => {
    const stats = [
        { value: '10,000+', label: 'Lives Saved' },
        { value: '50+', label: 'Partner Hospitals' },
        { value: '25,000+', label: 'Registered Donors' },
        { value: '100+', label: 'Cities Served' }
    ];

    const team = [
        {
            name: 'Dr. Priya Sharma',
            role: 'Medical Director',
            bio: 'Cardiologist with 15 years experience in transplant medicine',
            img: '/team/priya.jpg'
        },
        {
            name: 'Rahul Kapoor',
            role: 'Founder & CEO',
            bio: 'Tech entrepreneur passionate about healthcare accessibility',
            img: '/team/rahul.jpg'
        },
        {
            name: 'Ananya Patel',
            role: 'Donor Relations',
            bio: 'Coordinates with donors and recipient families',
            img: '/team/ananya.jpg'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <UserHeader />

            <main>
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-bold mb-6">Our Mission to Save Lives</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            Connecting donors with recipients to create a network of hope and healing across India
                        </p>
                    </div>
                </div>

                {/* Story Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    Founded in 2015, LifeShare began as a small initiative in Bangalore to address the critical shortage of organ and blood donors in India.
                                </p>
                                <p>
                                    After witnessing firsthand the challenges families face when searching for compatible donors, our founder Rahul Kapoor assembled a team of medical professionals and technologists to create a better system.
                                </p>
                                <p>
                                    Today, we've grown into India's most trusted donor-recipient matching platform, facilitating thousands of life-saving connections every year.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="/about-story.jpg"
                                alt="Medical team discussing patient care"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gray-100 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">By The Numbers</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <p className="text-4xl font-bold text-red-600">{stat.value}</p>
                                    <p className="mt-2 text-lg font-medium text-gray-700">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Leadership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-red-600 font-medium">{member.role}</p>
                                    <p className="mt-2 text-gray-600">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-red-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-red-600 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Compassion</h3>
                                <p className="text-gray-600">
                                    We treat every donor and recipient with the dignity and care we would want for our own families.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-red-600 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Urgency</h3>
                                <p className="text-gray-600">
                                    We move quickly because we understand that every minute counts in life-saving situations.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-red-600 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Integrity</h3>
                                <p className="text-gray-600">
                                    We maintain the highest ethical standards in all our donor-recipient matching processes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default About;