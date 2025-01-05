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

const districtMap = {
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

const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word).length; // Count words
};
const UpdateCommodity = () => {
    const location = useLocation();
    const { commodityId } = useParams();
    const navigate = useNavigate();
    const [commodity, setCommodity] = useState({
        commodity: '',
        price: '',
        varietyType: '',
        quantity: '',
        totalIn: '',
        state: '',
        district: '',
        description: '',
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
        if ((name === 'totalIn' || name === 'price' || name === 'quantity') && (isNaN(value) || value < 0)) {
            console.log(`Invalid value for ${name}. It cannot be negative.`);
            return; // Prevent setting negative or invalid numeric value
        }
        if (name === 'description' && countWords(value) > 25) {
            console.log('Description exceeds 25 words'); // Log for debugging
            return; // Ignore further updates if already exceeds 25 words
        }
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [commoditySearch, setCommoditySearch] = useState('');
    const [filteredCommodities, setFilteredCommodities] = useState([]);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const availableCommodities = ['Ajwain', 'Almond', 'Amla', 'Apricot', 'Arecanut',
        'Ash gourd', 'Atta', 'Avocado', 'Baheda', 'Bajra', 'Banana',
        'Barley', 'Basmati Rice', 'Bay leaf', 'Beetroot', 'Bitter gourd',
        'Bottle Gourd', 'Brinjal', 'Broad Beans', 'Coriander', 'Coriander Leaves', 'Cabbage', 'Capsicum',
        'Cardamom', 'Carrot', 'Cashew', 'Castor Oil', 'Castor Seed',
        'Cauliflower', 'Chana', 'Chana Dal', 'Cherry', 'Chia seed',
        'Chow Chow', 'Cinnamon', 'Cloves', 'Cluster Beans', 'Coconut',
        'Coconut Oil', 'Coffee',
        'Orange', 'Lemon', 'Lime', 'Grapefruit', 'Tangerine', 'Pomelo',
        'Strawberry', 'Blueberry', 'Raspberry', 'Blackberry', 'Cranberry', 'Black beans', 'Kidney beans',
        'Goji berry', 'Acai berry', 'Mango', 'Pineapple', 'Papaya',
        'Guava', 'Passion fruit', 'Lychee', 'Dragon fruit', 'Durian',
        'Rambutan', 'Starfruit', 'Jackfruit', 'Peach', 'Plum', 'Apricot',
        'Nectarine', 'Apple', 'Pear', 'Quince', 'Watermelon', 'Cantaloupe',
        'Honeydew', 'Fig', 'Date', 'Persimmon', 'Mangosteen', 'Tamarind',
        'Longan', 'Sapodilla', 'Kiwi', 'Pomegranate', 'Grape', 'Olive',
        'Spinach', 'Kale', 'Lettuce', 'Cabbage', 'Bok choy', 'Swiss chard',
        'Collard greens', 'Carrot', 'Beetroot', 'Radish', 'Turnip',
        'Parsnip', 'Sweet potato', 'Yam', 'Broccoli', 'Cauliflower',
        'Brussels sprouts', 'Kohlrabi', 'Onion', 'Garlic', 'Leek',
        'Shallot', 'Chive', 'Spring onion', 'Pumpkin', 'Zucchini',
        'Butternut squash', 'Spaghetti squash', 'Tomato', 'Eggplant',
        'Bell pepper', 'Chili pepper', 'Potato', 'Green beans', 'Peas',
        'Lentils', 'Chickpeas', 'Soybeans', 'Black-eyed peas',
        'Bitter gourd', 'Bottle gourd', 'Ridge gourd', 'Snake gourd',
        'Ash gourd', 'Taro', 'Turmeric', 'Ginger', 'Cassava', 'Saffron', 'Jerusalem artichoke', 'Cucumber',
        'Okra', 'Artichoke', 'Beetroot ', 'Celery', 'Asparagus', 'Corn', 'Mushrooms'];

    const handleCommoditySearchChange = (e) => {
        const value = e.target.value;
        setCommoditySearch(value);
        const filtered = availableCommodities.filter((commodity) =>
            commodity.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCommodities(filtered);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (countWords(commodity.description) > 25) {
            setError("Description must not exceed 25 words.");
            return;
        }
        if (!commodity.commodity || !commodity.price || !commodity.quantity || !commodity.state || !commodity.district) {
            setError("Please fill all necessary fields.");
            return;
        }
        if (commodity.price < 0 || commodity.quantity < 0) {
            setErrorMessage("Price and Quantity cannot be negative.");
            setErrorDialogOpen(true);
            setErrorDialogOpen(true);
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
                        {/* <div>
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
                        </div> */}
                        <div className="relative">
                            <input
                                name="commodity"
                                placeholder="Select Commodity"
                                value={commodity.commodity}
                                onClick={() => setIsDropdownOpen(true)}
                                readOnly
                                className={`
            w-full px-4 py-3 border-2 rounded-lg
            transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-[#2CB21A]/50
            cursor-pointer
            ${error.commodity && touched.commodity
                                        ? 'border-red-500'
                                        : 'border-[#2CB21A]'}
        `}
                            />
                            {isDropdownOpen && (
                                <div className="absolute w-full mt-2 max-h-96 overflow-auto border border-[#4CAF50] rounded-lg bg-[#F1F8E9] z-10 shadow-xl"
                                >
                                    <div className="p-4 border-t border-[#4CAF50]">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={commoditySearch}
                                            onChange={handleCommoditySearchChange}
                                            className="w-full px-4 py-2 border border-[#4CAF50] rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#81C784] focus:border-transparent transition-all duration-200 ease-in-out"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 p-4 max-h-72 overflow-auto">
                                        {filteredCommodities.map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setCommodity({ ...commodity, commodity: item });
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="
                            px-4 py-2 text-center text-sm bg-white border border-[#4CAF50] rounded-lg shadow-sm hover:bg-[#81C784] hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#66BB6A] transition-all duration-200 ease-in-out"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <input
                                name="varietyType"
                                placeholder="Variety Type"
                                value={commodity.varietyType || ''}
                                onChange={handleChange}
                                className={`w-full px-3 py-2.5 border-2 rounded-lg 
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-[#2CB21A]/50
                ${error.varietyType ? 'border-red-500' : 'border-[#2CB21A]'}`}
                            />
                            {error.varietyType && (
                                <p className="text-red-500 text-sm mt-1 pl-1">
                                    {error.varietyType}
                                </p>
                            )}
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
                            <textarea
                                name="description"
                                placeholder="Description (max 25 words)"
                                value={commodity.description}
                                onChange={handleChange}
                                rows="4"
                                className={`
      w-full px-3 py-2.5 border-2 rounded-lg 
      transition-all duration-300 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-[#2CB21A]/50
      ${error.description && touched.description
                                        ? 'border-red-500'
                                        : 'border-[#2CB21A]'
                                    }
    `}
                            />
                            {error.description && touched.description && (
                                <p className="text-red-500 text-sm mt-1 pl-1">
                                    {error.description}
                                </p>
                            )}
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
                <DialogTitle className="bg-green-500 text-white p-4">
                    <p className="text-white text-xl">Commodity Updated</p>
                </DialogTitle>
                <DialogContent className="p-6 mt-2">
                    <p className="text-gray-700 text-lg">Your commodity has been updated successfully.</p>
                </DialogContent>
                <DialogActions className="p-4">
                    <Button
                        onClick={handleCloseDialog}
                        color="primary"
                        className="hover:bg-gray-400">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                <DialogTitle className="bg-red-400 text-white text-2xl">Error</DialogTitle>
                <DialogContent>
                    <p className="text-xl">{errorMessage}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setErrorDialogOpen(false)} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UpdateCommodity;