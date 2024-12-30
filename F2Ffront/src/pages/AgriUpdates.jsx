import React from 'react'

const AgriUpdates = () => {
  // Example data for blog cards with real article links
  const blogPosts = [
    {
      id: 1,
      title: 'How to Improve Soil Fertility for Better Crop Yields',
      date: '2024-12-01',
      description: 'Learn about various methods to improve soil fertility for better crop growth and yields.',
      articleUrl: 'https://thegardenfixes.com/how-to-improve-soil-fertility/', // Link to actual article
      imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.esi6x1UoEkPLagYqQDOs_wHaEo&pid=Api&P=0&h=180', // Example image from Times of India
    },
    {
      id: 2,
      title: 'Top 5 Farming Techniques to Boost Crop Production',
      date: '2024-12-10',
      description: 'Explore the top 5 farming techniques that will increase your crop production significantly.',
      articleUrl: 'https://www.produceleaders.com/techniques-for-maximizing-crop-yield/', // Link to actual article
      imageUrl: 'https://www.tractorjunction.com/blog/wp-content/uploads/2019/04/How-to-Improve-Agriculture-Crop-Productivity.jpg', // Example image from Times of India
    },
    {
      id: 3,
      title: 'Understanding Organic Farming: A Beginner’s Guide',
      date: '2024-12-15',
      description: 'A comprehensive guide to starting with organic farming and its benefits for the environment.',
      articleUrl: 'https://shraaz.com/organic-farming-guide/', // Link to actual article
      imageUrl: 'https://healthiersteps.com/wp-content/uploads/2022/02/organic-farming-benefits.jpg', // Example image from Times of India
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-5">Agriculture Updates</h1>
      <div className=" w-20 justify-start border-t-4 border-lime-500 my-5" />
      {/* Blog Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
            <a href={post.articleUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{post.date}</p>
                <p className="text-sm text-gray-500">{post.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgriUpdates;
