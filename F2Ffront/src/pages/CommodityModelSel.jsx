import { IndianRupeeIcon, LeafIcon, Mail, MapPin, Package, Phone, X } from 'lucide-react';
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
            <div className="bg-white rounded-lg p-6 max-w-full mx-4 overflow-auto h-[90%]">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <LeafIcon className={`w-6 h-6 ${getThemeColor()}`} />
                        <h2 className={`text-xl font-bold ${getThemeColor()}`}>
                            {commodity.commodity} Details
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-transform transform hover:scale-105"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Location Info */}
                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span className="text-base font-semibold">
                        {commodity.district}, {commodity.state}
                    </span>
                </div>

                {/* Main Content */}
                <div className="border-t border-gray-200 pt-4 space-y-4 text-gray-700">
                    {/* Product Details */}
                    <div className="grid gap-4">
                        <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-gray-500" />
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
                    </div>

                    {/* Seller Info */}
                    <div className="bg-gray-50 rounded-lg p-2 space-y-2">
                        <div className="font-semibold text-gray-800">
                            {commodity.seller.name}
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <a href={`tel:${commodity.seller.mobile}`} className="text-blue-600 hover:underline">
                                {commodity.seller.mobile}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <a href={`mailto:${commodity.seller.email}`} className="text-blue-600 hover:underline">
                                {commodity.seller.email}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-1">
                    {commodity.images && commodity.images.length > 0 ? (
                        commodity.images.map((image, index) => (
                            <div key={index} className="relative w-full h-32 overflow-hidden rounded-md shadow">
                                <img
                                    src={image}
                                    alt={`${commodity.commodity} image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => (e.target.src = '/f2f.jpg')}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm text-center col-span-2 py-4">
                            No images available.
                        </p>
                    )}
                </div>

                {/* Close Button */}
                <button
                    className="mt-6 w-full bg-green-500 text-white rounded-lg px-4 py-2 font-medium hover:bg-green-600 transition-colors"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
});

export default CommodityModalSel;