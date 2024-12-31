// import { useState, useEffect } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

// const UpdateCommodity = () => {
//     const location = useLocation();
//     const { commodityId } = useParams();
//     const navigate = useNavigate();
//     const [commodity, setCommodity] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility

//     useEffect(() => {
//         if (!location.state?.commodity) {
//             fetchCommodityData();
//         } else {
//             setCommodity(location.state.commodity);
//         }
//     }, [location.state]);

//     const fetchCommodityData = async () => {
//         setLoading(true);
//         setError('');
//         try {
//             const token = localStorage.getItem("serviceToken");
//             if (!token) throw new Error("No auth token found. Please login again.");
//             const response = await api.get(`/api/commodities/${commodityId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setCommodity(response.data);
//         } catch (error) {
//             setError("Error fetching commodity data. Please try again later.",error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCommodity((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         try {
//             const token = localStorage.getItem("serviceToken");
//             if (!token) throw new Error("No auth token found. Please login again.");
//             const response = await api.put(
//                 `/api/updateCommodity/${commodityId}`,
//                 commodity,
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//             if (response.status === 200) {
//                 setOpenDialog(true); // Show dialog on success
//             } else {
//                 throw new Error("Failed to update commodity");
//             }
//         } catch (error) {
//             setError("Error updating commodity. Please try again later.",error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         navigate("/my-listing"); // Navigate to MyListing after closing the dialog
//     };

//     if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;

//     if (error) return <div className="text-center text-red-600">{error}</div>;

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//             <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
//                 <h1 className="text-3xl font-semibold text-center text-green-600 mb-8">Update Commodity</h1>

//                 {commodity && (
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div>
//                             <label htmlFor="commodity" className="block text-sm font-medium text-gray-700">Commodity</label>
//                             <input
//                                 id="commodity"
//                                 name="commodity"
//                                 type="text"
//                                 value={commodity.commodity || ''}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
//                             <input
//                                 id="price"
//                                 name="price"
//                                 type="number"
//                                 value={commodity.price || ''}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
//                             <input
//                                 id="quantity"
//                                 name="quantity"
//                                 type="number"
//                                 value={commodity.quantity || ''}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="totalIn" className="block text-sm font-medium text-gray-700">Unit (Kg/Liters etc.)</label>
//                             <input
//                                 id="totalIn"
//                                 name="totalIn"
//                                 type="text"
//                                 value={commodity.totalIn || ''}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
//                             <input
//                                 id="state"
//                                 name="state"
//                                 type="text"
//                                 value={commodity.state || ''}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
//                             <input
//                                 id="district"
//                                 name="district"
//                                 type="text"
//                                 value={commodity.district || ''}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                                 required
//                             />
//                         </div>

//                         <div className="flex justify-between">
//                             <button
//                                 type="button"
//                                 onClick={() => window.history.back()}
//                                 className="w-1/4 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
//                             >
//                                 Update Commodity
//                             </button>
//                         </div>
//                     </form>
//                 )}
//             </div>

//             {/* Success Dialog */}
//             <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//                 <DialogTitle>Commodity Updated</DialogTitle>
//                 <DialogContent>
//                     <p>Your commodity has been updated successfully.</p>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog} color="primary">OK</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default UpdateCommodity;


import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import FarmingLoaderSun from "../commoncomponents/FarmingLoaderSun";

// ... [State and District options remain unchanged] ...
const stateOptions = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 
    'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep',
    'Delhi', 'Puducherry', 'Ladakh', 'Jammu and Kashmir'
];

const districtMap  = {
    'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna',
                       'Kurnool', 'Prakasam', 'SPSR Nellore', 'Srikakulam',
                       'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
    
    'Arunachal Pradesh': ['Aalo', 'Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng',
                          'East Siang', 'Kamle', 'Khandung', 'Kra Daadi', 'Kurung Kumey',
                          'Lohit', 'Longding', 'Namsai', 'Papum Pare', 'Siang',
                          'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 
                          'West Kameng', 'West Siang'],
    
    'Assam': ['Ad Lakhtakung', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar',
              'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri',
              'Dibrugarh', 'Goalpara', 'Golaghat', 'Hailakandi', 
              'Jorhat', 'Kamrup', 'Karimganj', 'Kokrajhar', 'Lakhimpur',
              'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 
              'Sonitpur', 'Tinsukia', 'Udalguri'],
    
    'Bihar': ['Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur',
              'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 
              'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Katihar',
              'Khagaria', 'Kishanganj', 'Madhubani', 'Munger', 'Nawada',
              'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 
              'Saran', 'Sheikhpura', 'Sitamarhi', 'Siwan', 'Supaul', 
              'Vaishali', 'West Champaran'],
    
    'Chhattisgarh': ['Balod', 'Baloda Bazar', 'Bastar', 'Bilaspur',
                     'Dantewada', 'Dhamtari', 'Durg', 'Janjgir-Champa', 
                     'Jashpur', 'Kanker', 'Kawardha', 'Korba', 
                     'Kondagaon', 'Mahasamund', 'Raigarh', 'Raipur', 
                     'Ramanagara', 'Sukma', 'Surguja'],
    
    'Goa': ['North Goa', 'South Goa'],
    
    'Gujarat': ['Ahmedabad', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch',
                 'Bhavnagar', 'Botad', 'Dahod', 'Dangs', 'Gandhinagar',
                 'Kutch', 'Mahisagar', 'Mehsana', 'Narmada', 'Navsari', 
                 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 
                 'Sabarkantha', 'Surat', 'Tapi', 'Vadodara', 'Valsad'],
    
    'Haryana': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad',
                'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Mahendragarh',
                'Nuh', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak',
                'Sirsa', 'Sonipat'],
    
    'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 
                         'Kinnaur', 'Kullu', 'Mandi', 'Shimla', 
                         'Sirmaur', 'Solan', 'Una'],
    
    'Jharkhand': ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 
                  'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 
                  'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 
                  'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 
                  'Ramgarh', 'Ranchi', 'Sahebganj', 'Seraikela Kharsawan',
                  'Simdega', 'West Singhbhum'],
    
    'Karnataka': ['Bangalore', 'Belgaum', 'Bellary', 'Bidar', 'Chamarajanagar', 
                  'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 
                  'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 
                  'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysore', 
                  'Raichur', 'Ramanagara', 'Shimoga', 'Tumkur', 
                  'Udupi', 'Uttara Kannada', 'Yadgir'],
    
    'Kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod',
               'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad',
               'Pathanamthitta', 'Thrissur', 'Wayanad'],
    
    'Madhya Pradesh': ['Aden', 'Alirajpur', 'Anuppur', 'Ashok Nagar', 
                       'Balaghat', 'Barwani', 'Betul', 'Bhind', 
                       'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 
                       'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 
                       'Guna', 'Gwalior', 'Hoshangabad', 'Jabalpur', 
                       'Jawad', 'Khandwa', 'Khargone', 'Mandsaur', 
                       'Morena', 'Narmada', 'Neemuch', 'Panna', 
                       'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 
                       'Satna', 'Sehore', 'Shahdol', 'Shajapur', 
                       'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 
                       'Umaria', 'Vidisha'],
    
    'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 
                    'Beed', 'Bhandara', 'Bhivandi', 'Buldhana', 'Chandrapur', 
                    'Dhule', 'Gadchiroli', 'Gondia', 'Jalna', 'Mumbai', 
                    'Nashik', 'Nagpur', 'Nanded', 'Nandurbar', 
                    'Osmanabad', 'Palghar', 'Pune', 'Raigad', 
                    'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 
                    'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
    
    'Manipur': ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 
                'Imphal West', 'Senapati', 'Tamenglong', 'Tengnoupal', 
                'Thoubal', 'Ukhrul'],
    
    'Meghalaya': ['East Garo Hills', 'East Khasi Hills', 'South Garo Hills', 
                  'West Garo Hills', 'West Khasi Hills', 'Jaintia Hills'],
    
    'Mizoram': ['Aizawl', 'Champhai', 'Kolasib', 'Lawngtlai', 'Lungsai', 
                'Mamit', 'Saiha', 'Serchhip'],
    
    'Nagaland': ['Dimapur', 'Kohima', 'Longleng', 'Mokokchung', 'Peren', 
                 'Phek', 'Tuensang', 'Wokha', 'Zunheboto'],
    
    'Odisha': ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak',
               'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Ganjam',
               'Gajapati', 'Jharsuguda', 'Kalahandi', 'Kandhamal',
               'Kendrapara', 'Keonjhar', 'Koraput', 'Malkangiri',
               'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada',
               'Puri', 'Rayagada', 'Sambalpur', 'Sonepur', 'Sundargarh'],
    
    'Punjab': ['Amritsar', 'Barnala', 'Batala', 'Fatehgarh Sahib', 
               'Faridkot', 'Ferozepur', 'Gurdaspur', 'Kapurthala', 
               'Ludhiana', 'Mansa', 'Moga', 'Pathankot', 'Rupnagar', 
               'Sangrur', 'Tarn Taran'],
    
    'Rajasthan': ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 
                  'Bharatpur', 'Bhilwara', 'Bikaner', 'Chittorgarh', 
                  'Churu', 'Dausa', 'Dholpur', 'Hanumangarh', 'Jaipur', 
                  'Jaisalmer', 'Jalore', 'Jhunjhunu', 'Jodhpur', 
                  'Karauli', 'Kota', 'Nagaur', 'Pali', 'Rajsamand', 
                  'Sikar', 'Sirohi', 'Tonk', 'Udaipur'],
    
    'Sikkim': ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
    
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 
                   'Dindigul', 'Erode', 'Kanchipuram', 'Kanniyakumari', 
                   'Karur', 'Krishnagiri', 'Madurai', 'Nagapattinam', 
                   'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramnathapuram', 
                   'Salem', 'Sivagangai', 'Thanjavur', 'Theni', 
                   'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 
                   'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
    
    'Telangana': ['Adilabad', 'Hyderabad', 'Khammam', 'Mahabubnagar', 
                  'Medak', 'Nalgonda', 'Nizamabad', 'Ranga Reddy', 
                  'Sangareddy', 'Warangal', 'Karimnagar', 
                  'Medchal–Malkajgiri', 'Jagtiyal', 'Jagtial', 
                  'Kamareddy', 'Mahabubnagar'],
    
    'Tripura': ['Dhalai', 'Gomati', 'North Tripura', 'South Tripura',
                'Sepahijala', 'West Tripura'],
    
    'Uttar Pradesh': ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Ayodhya', 
                      'Azamgarh', 'Bahraich', 'Ballia', 'Banda', 
                      'Barabanki', 'Bareilly', 'Bijnor', 'Budaun', 
                      'Bulandshahr', 'Chitrakoot', 'Deoria', 
                      'Etah', 'Etawah', 'Farrukhabad', 
                      'Fatehpur', 'Firozabad', 'Gautam Buddh Nagar', 
                      'Ghaziabad', 'Ghazipur', 'Gonda', 'Hamirpur', 
                      'Hardoi', 'Hathras', 'Jhansi', 'Kanpur Dehat', 
                      'Kanpur Nagar', 'Kheri', 'Kushinagar', 
                      'Lalitpur', 'Lucknow', 'Maharajganj', 
                      'Mainpuri', 'Mathura', 'Mau', 'Mirzapur', 
                      'Moradabad', 'Muzaffarnagar', 'Pilbit', 
                      'Pratapgarh', 'Rae Bareli', 'Rampur', 
                      'Saharanpur', 'Sant Ravidas Nagar', 
                      'Shahjahanpur', 'Shamli', 'Shravasti', 
                      'Siddharthnagar', 'Sitapur', 'Sonbhadra', 
                      'Sultanpur', 'Unnao', 'Varanasi'],
    
    'Uttarakhand': ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 
                    'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 
                    'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 
                    'Udham Singh Nagar', 'Uttarkashi'],
    
    'West Bengal': ['Bankura', 'Bardhaman', 'Birbhum', 'Darjeeling', 
                    'Dakshin Dinajpur', 'Howrah', 'Jalpaiguri', 
                    'Jhargram', 'Murshidabad', 'Nadia', 
                    'North 24 Parganas', 'Paschim Medinipur', 
                    'Purba Medinipur', 'Purulia', 'South 24 Parganas', 
                    'Kolkata'],
    
    'Andaman and Nicobar Islands': ['North and Middle Andaman', 
                                    'South Andaman', 'Nicobar'],
    
    'Chandigarh': ['Chandigarh'],
    
    'Dadra and Nagar Haveli and Daman and Diu': ['Dadra and Nagar Haveli', 
                                                  'Daman', 'Diu'],
    
    'Lakshadweep': ['Lakshadweep'], // Single district but multiple islands
    
    'Delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 
              'North Delhi', 'North East Delhi', 
              'North West Delhi', 'South Delhi', 
              'South East Delhi', 'West Delhi'],
    
    'Puducherry': ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
    
    'Ladakh': ['Leh', 'Kargil'],
    
    'Jammu and Kashmir': ['Jammu', 'Samba', 'Kathua', 'Udhampur', 
                         'Doda', 'Ramban', 'Reasi', 'Poonch', 
                         'Rajouri', 'Anantnag', 'Pulwama', 
                         'Shopian', 'Kulgam', 'Srinagar', 
                         'Bandipora', 'Ganderbal', 'Baramulla']
};

const totalInUnits = [
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'mt', label: 'Metric Tons (mt)' },
    { value: 'quintal', label: 'Quintal' },
    { value: 'ton', label: 'Ton' }
  ];

const UpdateCommodity = () => {
    const location = useLocation();
    const { commodityId } = useParams();
    const navigate = useNavigate();
    const [commodity, setCommodity] = useState({
        commodity: '',
        price: '',
        quantity: '',
        totalIn: '',
        state: '',
        district: '',
        images: [] // Initialize an empty images array
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [districts, setDistricts] = useState([]);
    useEffect(() => {
        if (!location.state?.commodity) {
            fetchCommodityData();
        } else {
            setCommodity(location.state.commodity);
            setDistricts(districtMap[location.state.commodity.state] || []);
        }
    }, [location.state]);

    const fetchCommodityData = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem("serviceToken");
            if (!token) throw new Error("No auth token found. Please login again.");
            const response = await api.get(`/api/commodities/${commodityId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCommodity(response.data);
            setDistricts(districtMap[response.data.state] || []);
        } catch (error) {
            console.error("Fetch error:", error);
            setError("Error fetching commodity data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'state') {
            console.log('State changed:', value);
            // Update districts when state changes
            setDistricts(districtMap[value] || []);
            setCommodity(prev => ({ ...prev, district: '', [name]: value }));
        } else {
            // Log value updates for debugging
            console.log(`Updating commodity field ${name}:`, value);
            setCommodity(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commodity.commodity || !commodity.price || !commodity.quantity || !commodity.state || !commodity.district) {
            setError("Please fill all necessary fields.");
            return;
        }

        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem("serviceToken");
            if (!token) throw new Error("No auth token found. Please login again.");
            const response = await api.put(
                `/api/updateCommodity/${commodityId}`,
                commodity,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response.status === 200) {
                setOpenDialog(true);
            } else {
                throw new Error("Failed to update commodity");
            }
        } catch (error) {
            console.error("Update error:", error);
            setError("Error updating commodity. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        navigate("/my-listing");
    };

    // Loading and Error States
    if (loading) return <FarmingLoaderSun />;
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
                <h1 className="text-3xl font-semibold text-center text-green-600 mb-8">Update Commodity</h1>

                {commodity?.images?.length > 0 && (
                    <div className={`relative grid ${commodity.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'} gap-2 p-2 bg-gray-50`}>
                        {commodity.images.map((image, index) => (
                            <div key={index} className="relative group overflow-hidden rounded-lg shadow-md">
                                <img
                                    src={image}
                                    alt={`${commodity.commodity} image ${index + 1}`}
                                    className="w-full h-32 object-cover"
                                    onError={(e) => (e.target.src = '/fallback-image.jpg')}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {commodity && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="commodity" className="block text-sm font-medium text-gray-700">Commodity</label>
                            <input
                                id="commodity"
                                name="commodity"
                                type="text"
                                value={commodity.commodity || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                value={commodity.price || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={commodity.quantity || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="totalIn" className="block text-sm font-medium text-gray-700">Unit</label>
                            <select
                                id="totalIn"
                                name="totalIn"
                                value={commodity.totalIn || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            >
                                <option value="" disabled>Select Unit</option>
                                {totalInUnits.map(unit => (
                                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                            <select
                                id="state"
                                name="state"
                                value={commodity.state || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            >
                                <option value="" disabled>Select State</option>
                                {stateOptions.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                            <select
                                id="district"
                                name="district"
                                value={commodity.district || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            >
                                <option value="" disabled>Select District</option>
                                {districts.map(district => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="w-1/4 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                Update Commodity
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Commodity Updated</DialogTitle>
                <DialogContent>
                    <p>Your commodity has been updated successfully.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UpdateCommodity;