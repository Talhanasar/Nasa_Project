import React, { useEffect, useState } from 'react';
import '../css/stormSearch.css';

const StormSearch = () => {
  const [inputDate, setInputDate] = useState('');
  const [filteredData, setFilteredData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = 'JUdwVrz0c8uDNrcEc2buNas853b92YMkrOZq7gQ1'; // NASA API key

  const fetchGSTData = async (startDate) => {
    try {
      setLoading(true);
      setErrorMessage('');
      const response = await fetch(
        `https://api.nasa.gov/DONKI/GST?startDate=2020-01-01&endDate=${startDate}&api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      if (data.length > 0 && data[data.length - 1].gstID.split('T')[0] === startDate) {
        setFilteredData(data[data.length - 1]);
      } else {
        setFilteredData([]);
        setErrorMessage(`No data available for the selected date. latest data available ${data[data.length - 1].gstID.split('T')[0]} till your given date`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchGSTData(inputDate); // Fetch GST data for the selected date
  };

  return (
    <div className="container">
      <h1>Solar Storm (GST) Data Lookup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Data'}
        </button>
      </form>

      <div className="result">
        {errorMessage && <p className="no-data">{errorMessage}</p>}
        {filteredData.gstID && (
            <div className="gst-data">
              <h3>GST ID: {filteredData.gstID}</h3>
              <p><strong>Start Time:</strong> {new Date(filteredData.startTime).toLocaleString()}</p>
              <p><strong>KP Index:</strong> {filteredData.allKpIndex.length > 0 ? filteredData.allKpIndex[0].kpIndex : 'N/A'}</p>
              <p><a href={filteredData.link} target="_blank" rel="noopener noreferrer">More Information</a></p>
              <hr />
            </div>
        )}
      </div>
    </div>
  );
};

export default StormSearch;
