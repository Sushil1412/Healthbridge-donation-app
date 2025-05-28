import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
// import PrivateRoute from './utils/PrivateRoutes';
// import { 
//   ProtectedRoute, 
//   AdminRoute, 
//   RecipientRoute, 
//   DonorRoute, 
//   HospitalRoute 
// } from './utils/ProtectedRoute';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
// import Dashboard from './pages/userpages/Dashboard';
import RecipientDashboard from './pages/userpages/RecipiantDashboard';
// import NewRequest from './components/Request/NewRequest';
// import Requests from './pages/userpages/Requests';
import UserAppointment from './components/Appointment/UserAppointment';
import UserProfile from './components/Profiles/UserProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Admin/AdminDashboard';
import HospitalDetails from './pages/Admin/HospitalDetails'
import BloodDonation from './pages/Admin/BloodDonation';
import OrganDonor from './pages/Admin/OrganDonor';
import Hospital from './pages/Hospital/Hospital'
import BloodPage from './pages/Hospital/BloodPage'
import OrganPage from './pages/Hospital/OrganPage';
import DoctorPage from './pages/Hospital/DoctorPage';
import Appointment from './pages/Hospital/Appointment';
import Donor from './pages/Donors/Donor';
import AppointmentManagement from './pages/Donors/Appointment';
import Donation from './pages/Donors/Donation';
import AdminLogin from './components/Auth/AdminLogin';
// import Registration from './pages/Admin/Registration';
import AdminRequestsPage from './pages/Admin/AdminRequestsPage';
// import UerRequest from '../../server/models/UerRequest';
import Registration from './pages/Admin/Registration';

// Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Your auth hook/context
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider> {/* Wrap with your auth provider */}
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/adminlogin" element={<AdminLogin />} /> */}

        {/* user */}
        <Route path="/Recipiant-dashboard" element={<RecipientDashboard />} />
        <Route path="/Recipiant-dashboard/Appointment" element={<UserAppointment />} />
        <Route path="/Recipiant-dashboard/userprofile" element={<UserProfile />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

        {/* admin */}

        <Route path="/Admin" element={<AdminDashboard />} />
        <Route path="/Admin/hospital" element={<HospitalDetails />} />
        <Route path="/Admin/blood" element={<BloodDonation />} />
        <Route path="/Admin/organ" element={<OrganDonor />} />
        <Route path="/Admin/registration" element={<Registration />} />
        <Route path="/Admin/request" element={<AdminRequestsPage />} />


        {/* Hospital */}

        <Route path="/hospital" element={<Hospital />} />
        <Route path="/hospital/blood" element={<BloodPage />} />
        <Route path="/hospital/organ" element={<OrganPage />} />
        <Route path="/hospital/doctor" element={<DoctorPage />} />
        <Route path="/hospital/appointment" element={<Appointment />} />

        {/*Donor*/}
        <Route path="/donor" element={<Donor />} />
        <Route path="/donor/appointment" element={<AppointmentManagement />} />
        <Route path="/donor/donation" element={<Donation />} />




        {/* Protected Routes */}
        <Route
          path="/Recipiant-dashboard/Appointment"
          element={
            <PrivateRoute>
              <UserAppointment />
            </PrivateRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;