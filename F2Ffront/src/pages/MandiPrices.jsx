import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Fuse from "fuse.js";
import { FaSearch, FaMapMarkerAlt, FaBuilding, FaSeedling, FaRupeeSign, FaExclamationCircle } from 'react-icons/fa';
import { GiIndianPalace } from 'react-icons/gi';
import mandiData from "../data/converted_data.json";
import FarmingLoaderSun from "../commoncomponents/FarmingLoaderSun";

const MandiPriceFinder = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const validationSchema = Yup.object().shape({
    state: Yup.string().required("State is required"),
    market: Yup.string().required("Market is required"),
    commodity: Yup.string().required("Commodity is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    setIsLoading(true); // Start loading
    setTimeout(() => {
      const fuse = new Fuse(mandiData, {
        keys: ['State', 'Market', 'Commodity'],
        includeScore: true,
        threshold: 0.3,
      });

      const results = fuse.search(values.state, { limit: 10 }).map(result => result.item).filter(item => {
        return (
          item.Market.trim().toLowerCase().includes(values.market.trim().toLowerCase()) &&
          item.Commodity.trim().toLowerCase().includes(values.commodity.trim().toLowerCase())
        );
      });

      setFilteredData(results);
      setIsLoading(false); // Stop loading
      resetForm();
    }, 1000);                                               
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-greenCustom mb-8 flex items-center justify-center gap-2">
        <GiIndianPalace className="text-4xl" />
        Mandi Prices
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <Formik
          initialValues={{ state: "", market: "", commodity: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 md:space-y-0 md:flex md:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                  <Field
                    type="text"
                    name="state"
                    placeholder="Enter state"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent border shadow-sm  focus:outline-none"
                  />
                </div>
                <ErrorMessage
                  name="state"
                  component="div"
                  className="mt-1 text-sm text-red-500 flex items-center gap-1"
                  render={msg => (
                    <div className="flex items-center gap-1 text-red-500">
                      <FaExclamationCircle />
                      <span>{msg}</span>
                    </div>
                  )}
                />
              </div>

              <div className="flex-1">
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                  <Field
                    type="text"
                    name="market"
                    placeholder="Enter market"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent border shadow-sm  focus:outline-none"
                  />
                </div>
                <ErrorMessage
                  name="market"
                  component="div"
                  className="mt-1 text-sm text-red-500 flex items-center gap-1"
                  render={msg => (
                    <div className="flex items-center gap-1 text-red-500">
                      <FaExclamationCircle />
                      <span>{msg}</span>
                    </div>
                  )}
                />
              </div>

              <div className="flex-1">
                <div className="relative">
                  <FaSeedling className="absolute left-3 top-3 text-gray-400" />
                  <Field
                    type="text"
                    name="commodity"
                    placeholder="Enter commodity"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent border shadow-sm  focus:outline-none"
                  />
                </div>
                <ErrorMessage
                  name="commodity"
                  component="div"
                  className="mt-1 text-sm text-red-500 flex items-center gap-1"
                  render={msg => (
                    <div className="flex items-center gap-1 text-red-500">
                      <FaExclamationCircle />
                      <span>{msg}</span>
                    </div>
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-6 py-2 bg-greenCustom text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <FaSearch />
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <FarmingLoaderSun/>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <h3 className="text-xl font-semibold text-greenCustom mb-4 flex items-center gap-2">
                    <FaSeedling />
                    {item.Commodity}
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt />
                      <span className="font-medium">State:</span> {item.State}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaBuilding />
                      <span className="font-medium">District:</span> {item.District}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaBuilding />
                      <span className="font-medium">Market:</span> {item.Market}
                    </p>
                    <div className="pt-4 border-t border-gray-100 mt-4">
                      <div className="flex items-center gap-2 text-greenCustom">
                        <FaRupeeSign />
                        <span className="font-medium">Prices:</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <p className="text-sm text-gray-500">Min</p>
                          <p className="font-semibold">₹{item.Min_x0020_Price}</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <p className="text-sm text-gray-500">Max</p>
                          <p className="font-semibold">₹{item.Max_x0020_Price}</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <p className="text-sm text-gray-500">Modal</p>
                          <p className="font-semibold">₹{item.Modal_x0020_Price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12 flex flex-col items-center justify-center">
              <FaSearch className="text-5xl text-gray-300 mb-4" />
              <p className="text-lg">No results found. Try different search terms.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MandiPriceFinder;
