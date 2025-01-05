import { Clock2, IndianRupeeIcon, LeafIcon, Mail, MapPin, MessageSquareText, Package, Phone, Sparkles, User, X } from 'lucide-react';
import { memo } from 'react';

const CommodityModalSel = memo(({ isOpen, onClose, commodity }) => {
    if (!isOpen || !commodity) return null;

    const getThemeColor = () => {
        const type = commodity.commodity.toLowerCase();
        if (type.includes('fruit')) return 'text-orange-600';
        if (type.includes('vegetable')) return 'text-green-600';
        return 'text-emerald-600';
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-lg p-6 max-w-full mx-4 overflow-auto h-[75%] relative shadow-lg">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-transform transform hover:scale-105"
                    aria-label="Close"
                >
                    <X className="w-6 h-6 text-gray-500" />
                </button>

                {/* Header */}
                <div className="flex items-center justify-between mb-6 border-b pb-3">
                    <div className="flex items-center gap-2">
                        <LeafIcon className={`w-6 h-6 ${getThemeColor()}`} />
                        <h2 className={`text-xl font-bold ${getThemeColor()}`}>
                            {commodity.commodity} Details
                        </h2>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Clock2 className="w-5 h-5 text-gray-600 mr-2" />
                    <span>Listed On : {new Date(commodity.createdAt).toLocaleDateString('en-GB')}</span>
                </div>

                {/* Location Info */}
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-5 h-5" />
                    <span className="text-base font-semibold">
                        {commodity.district}, {commodity.state}
                    </span>
                </div>

                {/* Main Content */}
                <div className="border-t border-gray-200 pt-4 space-y-6">
                    {/* Product Details */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-gray-500" />
                            <div className="text-sm">
                                <span className="font-semibold">Variety: </span>
                                {commodity.varietyType}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <IndianRupeeIcon className="w-5 h-5 text-gray-500" />
                            <div className="text-sm">
                                <span className="font-semibold">Selling Price: </span>
                                ₹{commodity.price} / {commodity.totalIn}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-gray-500" />
                            <div className="text-sm">
                                <span className="font-semibold">Trade Volume: </span>
                                {commodity.quantity} {commodity.totalIn}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MessageSquareText className="w-5 h-5 text-gray-500" />
                            <div className="text-sm">
                                <span className="font-semibold">Product Description: </span>
                                {commodity.description}
                            </div>
                        </div>
                    </div>

                    {/* Seller Info */}
                    <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
                        <div className="flex font-semibold gap-2 text-gray-800">
                            <User className="w-4 h-4 text-gray-800" />
                            {commodity.seller.name}
                            <p className="text-xs text-gray-500">
                                <span className="inline-flex items-center px-1 py-1 bg-green-100 text-green-700 font-medium rounded-full border border-green-300 shadow-sm">
                                    {commodity.seller.user_type || 'Seller'}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2 pl-2 mt-2">
                            <Phone className="w-4 h-4 text-orange-500" />
                            <a
                                href={`tel:${commodity.seller.mobile}`}
                                className="text-orange-600 hover:underline"
                            >
                                {commodity.seller.mobile}
                            </a>
                        </div>
                        <div className="flex items-center gap-2 pl-2">
                            <a href={`https://wa.me/${commodity.seller.mobile}`} target="_blank" rel="noopener noreferrer" className="flex items-center w-[15px] h-[15px]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="#25D366" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.3 56.2 9.8 66.9 8.7 14.4-1.1 24.2-13.3 30.3-23.8 3.2-5.4 2.8-10.2-.1-15.3-2.5-5.4-4.7-7.7-9.7-10.4z" />
                                </svg>
                            </a>
                            <a
                                href={`https://wa.me/${commodity.seller.mobile}`}
                                className="text-green-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>
                        <div className="flex items-center gap-2 pl-2">
                            <Mail className="w-4 h-4 text-gray-500" />

                            <a
                                href={`mailto:${commodity.seller.email}`}
                                className="text-blue-600 hover:underline"
                            >
                                {commodity.seller.email}
                            </a>
                        </div>

                    </div>
                </div>

                {/* Images Carousel */}
                <div className="mt-10">
                    {commodity.images && commodity.images.length > 0 ? (
                        <div className="flex gap-2 overflow-x-auto">
                            {commodity.images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative w-32 h-32 rounded-md shadow overflow-hidden"
                                >
                                    <img
                                        src={image}
                                        alt={`${commodity.commodity} image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.target.src = '/fallback.jpg')}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm text-center">
                            No images available.
                        </p>
                    )}
                </div>


            </div>
        </div>
    );
});

export default CommodityModalSel;
