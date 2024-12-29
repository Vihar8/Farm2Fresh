import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import api from '../api/axios'; // Assuming you're using axios
import { CheckCircle, Upload, AlertCircle, X } from 'lucide-react';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Optional: Send error to logging service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Unexpected Error Occurred
            </h2>
            <p className="text-gray-600 mb-6">
              {this.state.error ? this.state.error.toString() : 'Something went wrong'}
            </p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Reload Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const handleQuantityChange = (e, setFieldValue) => {
  const value = e.target.value;

  // Check if the value is a valid number and >= 0 (including decimals)
  if (value === "" || !isNaN(value) && parseFloat(value) >= 0) {
    setFieldValue(e.target.name, value); // Update the field value directly
  }
};
// Commodity Form Component
const CommodityForm = () => {
  // Validation Schema
  const CommoditySchema = Yup.object().shape({
    commodity: Yup.string()
      .required('Commodity is required')
      .min(2, 'Commodity name too short'),
    varietyType: Yup.string()
      .required('Variety type is required'),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('Quantity must be positive'),
    totalIn: Yup.string()
      .oneOf(['kg', 'mt', 'quintal', 'ton'], 'Invalid unit')
      .required('Total In is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    images: Yup.array()
      .min(1, 'At least one image is required')
      .max(2, 'Maximum 2 images allowed')
  });

  // State Management
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'success'
  });

  // Auto-dismiss snackbar
  useEffect(() => {
    let timeoutId;
    if (snackbar.open) {
      timeoutId = setTimeout(() => {
        setSnackbar(prev => ({ ...prev, open: false }));
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [snackbar.open]);

  // Static Data
  // const stateOptions = [
  //   'Maharashtra', 'Karnataka', 'Tamil Nadu',
  //   'Uttar Pradesh', 'Gujarat', 'Rajasthan',
  //   'Punjab', 'Kerala', 'West Bengal',
  //   'Madhya Pradesh', 'Bihar', 'Odisha'
  // ];

  // const districtMap = {
  //   'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  //   'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
  //   'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirapalli', 'Salem'],
  //   'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut'],
  //   'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  //   'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Ajmer', 'Bikaner'],
  //   'Punjab': ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda'],
  //   'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Alappuzha'],
  //   'West Bengal': ['Kolkata', 'Darjeeling', 'Asansol', 'Siliguri', 'Howrah'],
  //   'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
  //   'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
  //   'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri', 'Berhampur']
  // };

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

  // File Upload Handler
  const handleFileUpload = (event, setFieldValue) => {
    const uploadedFiles = Array.from(event.target.files);

    if (uploadedFiles.length + files.length > 2) {
      setSnackbar({
        open: true,
        message: 'Maximum 2 images allowed',
        type: 'error'
      });
      return;
    }

    setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
    setFieldValue('images', [...files, ...uploadedFiles]);
  };

  // Remove Image Handler
  const removeImage = (indexToRemove, setFieldValue) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(newFiles);
    setFieldValue('images', newFiles);
  };

  // Submit Handler
  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();

    Object.keys(values).forEach(key => {
      if (key !== 'images') {
        formData.append(key, values[key]);
      }
    });

    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      setIsUploading(true);
      const response = await api.post('/api/commodities', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSnackbar({
        open: true,
        message: 'Commodity added successfully',
        type: 'success'
      });

      // Reset form
      resetForm();
      setFiles([]);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to add commodity',
        type: 'error'
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Snackbar Component
  const Snackbar = ({ open, onClose, message, type, icon }) => {
    if (!open) return null;

    return (
      <div
        className={`
          fixed bottom-4 left-1/2 transform -translate-x-1/2 
          px-4 py-3 rounded-lg shadow-lg z-50
          flex items-center space-x-3
          w-96 max-w-full
          ${type === 'success'
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
          }
          animate-slide-up
        `}
      >
        <div className="absolute bottom-0 left-0 h-1 bg-white/30 animate-progress-bar"></div>
        {icon}
        <span className="flex-grow">{message}</span>
        <button
          onClick={onClose}
          className="hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="max-h-screen bg-gray-50 flex items-center justify-center p-5 mt-2">
      <div className="w-full max-w-md bg-white border-2 border-[#2CB21A] rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#2CB21A] mb-6">
          Add New Commodity
        </h2>

        <Formik
          initialValues={{
            commodity: '',
            varietyType: '',
            quantity: '',
            totalIn: '',
            price: '',
            state: '',
            district: '',
            images: []
          }}
          validationSchema={CommoditySchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange
          }) => (
            <Form className="space-y-4">
              {/* Commodity Name Input */}
              <div>
                <input
                  name="commodity"
                  placeholder="Commodity Name"
                  value={values.commodity}
                  onChange={handleChange}
                  className={`
                    w-full px-3 py-2.5 border-2 rounded-lg 
                    transition-all duration-300 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-[#2CB21A]/50
                    ${errors.commodity && touched.commodity
                      ? 'border-red-500'
                      : 'border-[#2CB21A]'
                    }
                  `}
                />
                {errors.commodity && touched.commodity && (
                  <p className="text-red-500 text-sm mt-1 pl-1">
                    {errors.commodity}
                  </p>
                )}
              </div>

              {/* Variety Type Input */}
              <div>
                <input
                  name="varietyType"
                  placeholder="Variety Type"
                  value={values.varietyType}
                  onChange={handleChange}
                  className={`
                    w-full px-3 py-2.5 border-2 rounded-lg 
                    transition-all duration-300 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-[#2CB21A]/50
                    ${errors.varietyType && touched.varietyType
                      ? 'border-red-500'
                      : 'border-[#2CB21A]'
                    }
                  `}
                />
                {errors.varietyType && touched.varietyType && (
                  <p className="text-red-500 text-sm mt-1 pl-1">
                    {errors.varietyType}
                  </p>
                )}
              </div>

              {/* State and District Dropdowns */}
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="state"
                  value={values.state}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue('district', '');
                  }}
                  className={`
                    w-full px-3 py-2.5 border-2 rounded-lg
                    ${errors.state && touched.state
                      ? 'border-red-500'
                      : 'border-[#2CB21A]'
                    }
                  `}
                >
                  <option value="">Select State</option>
                  {stateOptions.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <select
                  name="district"
                  value={values.district}
                  onChange={handleChange}
                  disabled={!values.state}
                  className={`
                    w-full px-3 py-2.5 border-2 rounded-lg
                    ${errors.district && touched.district
                      ? 'border-red-500'
                      : 'border-[#2CB21A]'
                    }
                    ${!values.state ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <option value="">Select District</option>
                  {values.state && districtMap[values.state]?.map(district => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity and Price Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={values.quantity}
                  onChange={(e) => handleQuantityChange(e, setFieldValue)}  // Custom handler to prevent negative numbers
                  className={`w-full px-3 py-2.5 border-2 rounded-lg ${errors.quantity && touched.quantity ? 'border-red-500' : 'border-[#2CB21A]'}`}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={values.price}
                  onChange={(e) => handleQuantityChange(e, setFieldValue)}
                  className={`
                    w-full px-3 py-2.5 border-2 rounded-lg
                    ${errors.price && touched.price
                      ? 'border-red-500'
                      : 'border-[#2CB21A]'
                    }
                  `}
                />
              </div>

              {/* Total In Dropdown */}
              <div>
                <select
                  name="totalIn"
                  value={values.totalIn}
                  onChange={handleChange}
                  className={`
                    w-full px-3 py-2.5 border-2 rounded-lg
                    ${errors.totalIn && touched.totalIn
                      ? 'border-red-500'
                      : 'border-[#2CB21A]'
                    }
                  `}
                >
                  <option value="">Select Unit</option>
                  {totalInUnits.map(unit => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
                {errors.totalIn && touched.totalIn && (
                  <p className="text-red-500 text-sm mt-1 pl-1">
                    {errors.totalIn}
                  </p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, setFieldValue)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="
                    flex items-center justify-center 
                    border-2 border-dashed 
                    border-[#2CB21A] 
                    p-4 cursor-pointer 
                    hover:bg-green-50
                    rounded-lg
                    transition-all duration-300
                  "
                >
                  <Upload className="mr-2 text-[#2CB21A]" />
                  <span>Upload Images (Max 2)</span>
                </label>

                {/* Images Preview */}
                {files.length > 0 && (
                  <div className="mt-3 flex space-x-2">
                    {files.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`upload-${index}`}
                          className="w-16 h-16 object-cover rounded border-2 border-[#2CB21A] shadow"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, setFieldValue)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUploading}
                className="
                  w-full py-2 rounded-lg 
                  bg-[#2CB21A] 
                  text-white 
                  hover:bg-green-600 transition 
                  duration-150 ease-in-out
                  disabled:opacity-50
                "
              >
                {isUploading ? 'Adding...' : 'Add Commodity'}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        type={snackbar.type}
        icon={
          snackbar.type === 'success'
            ? <CheckCircle className="text-white" />
            : <AlertCircle className="text-white" />
        }
      />
    </div>
  );
};

export default CommodityForm;