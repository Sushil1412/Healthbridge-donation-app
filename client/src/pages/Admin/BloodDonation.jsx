import React, { useState, useEffect } from "react";
import AdminHeader from '../../components/Header/AdminHeader'
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const donors = [
    { id: 1, name: "Suresh Kumar", age: 32, bloodGroup: "A+" },
    { id: 2, name: "Anjali Mehta", age: 25, bloodGroup: "O-" },
    { id: 3, name: "Ravi Singh", age: 29, bloodGroup: "B+" },
    { id: 4, name: "Pooja Sharma", age: 22, bloodGroup: "AB-" },
    { id: 5, name: "Rahul Verma", age: 35, bloodGroup: "O+" },
];

export default function BloodDonationCard() {
    const [selectedGroup, setSelectedGroup] = useState("");
    const [filteredDonors, setFilteredDonors] = useState(donors);

    useEffect(() => {
        if (selectedGroup === "") {
            setFilteredDonors(donors);
        } else {
            setFilteredDonors(
                donors.filter((donor) => donor.bloodGroup === selectedGroup)
            );
        }
    }, [selectedGroup]);

    const handleBookAppointment = (donorId) => {
        alert(`Booked appointment with donor ID: ${donorId}`);
    };

    return (
        <>
            <AdminHeader />
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-red-600">Blood Donor List</h1>

                <div className="mb-4">
                    <select
                        className="border border-gray-300 rounded px-4 py-2"
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                        <option value="">Filter by Blood Group</option>
                        {bloodGroups.map((group) => (
                            <option key={group} value={group}>
                                {group}
                            </option>
                        ))}
                    </select>
                </div>

                <ul className="space-y-2">
                    {filteredDonors.length === 0 ? (
                        <p className="text-gray-500">No donors available for selected group.</p>
                    ) : (
                        filteredDonors.map((donor) => (
                            <li
                                key={donor.id}
                                className="flex justify-between items-center border-b py-2"
                            >
                                <div>
                                    <span className="font-medium">{donor.name}</span>{" "}
                                    <span className="text-sm text-gray-500">({donor.bloodGroup})</span>
                                </div>
                                <button
                                    onClick={() => handleBookAppointment(donor.id)}
                                    className="text-red-600 text-2xl font-bold hover:scale-110 transition"
                                    aria-label={`Book appointment with ${donor.name}`}
                                >
                                    +
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>

        </>

    );
}
