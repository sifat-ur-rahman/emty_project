import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
  const [currentCard, setCurrentCard] = useState(null);
    const [seriesData, setSeriesData] = useState([]);
// console.log(seriesData);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo'
          );
          
          if (response.ok) {
            const json = await response.json();
            const data = json['Time Series (5min)'];
            const seriesDataArray = Object.entries(data);
          setSeriesData(seriesDataArray)
          } else {
            throw new Error('Error fetching data');
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);

    const handleShare = (key, value) => {
        setCurrentCard({ key, value });
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
        setCurrentCard(null);
        setEmail('');
      };
    
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
      const handleShareSubmit = (event) => {
        event.preventDefault();
        // Implement your share functionality here
        console.log('Share:', email, currentCard);
        handleCloseModal();
      };

    return (
        <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {seriesData.map(([key, value]) => (
            <div key={key} className="card bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">{key}</h3>
              <p className="text-gray-500">Open: {value['1. open']}</p>
              <p className="text-gray-500">High: {value['2. high']}</p>
              <p className="text-gray-500">Low: {value['3. low']}</p>
              <p className="text-gray-500">Close: {value['4. close']}</p>
              <p className="text-gray-500">Volume: {value['5. volume']}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => handleShare(key, value)}
              >
                Share
              </button>
            </div>
          ))}
        </div>
        
        {showModal && currentCard && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Share via Email</h2>
              <div>
                <h3 className="text-lg font-semibold mb-2">{currentCard.key}</h3>
                <p className="text-gray-500">Open: {currentCard.value['1. open']}</p>
                <p className="text-gray-500">High: {currentCard.value['2. high']}</p>
                <p className="text-gray-500">Low: {currentCard.value['3. low']}</p>
                <p className="text-gray-500">Close: {currentCard.value['4. close']}</p>
                <p className="text-gray-500">Volume: {currentCard.value['5. volume']}</p>
              </div>
              <form onSubmit={handleShareSubmit}>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Share
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
};

export default Services;