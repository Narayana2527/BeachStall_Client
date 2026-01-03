import React,{ useState, useCallback } from 'react'

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// Define the size of your map container
const containerStyle = {
  width: '100%',
  height: '400px'
};

// Default center (e.g., San Francisco)
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194
};

// Define the libraries you need (optional, but good practice)
const libraries = ['places'];
const Menu = () => {
  const [coords, setCoords] = useState(defaultCenter);
  const [map, setMap] = useState(null);

  // 1. Load the Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // <-- **REPLACE THIS**
    libraries,
  });

  // 2. Event Handler: Get Coords on Click
  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setCoords({ lat, lng });
    console.log(`Clicked Lat: ${lat}, Lng: ${lng}`);
  }, []);

  // 3. Optional: Store the map instance (e.g., for geocoding later)
  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h3>📍 Click the Map to Get Coordinates</h3>
      
      {/* Display the current coordinates */}
      <p>
        **Latitude:** {coords.lat.toFixed(6)} | **Longitude:** {coords.lng.toFixed(6)}
      </p>

      {/* The actual Google Map component */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coords} // Center the map on the last clicked location
        zoom={12}
        onClick={handleMapClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* You can add Markers, InfoWindows, etc., here */}
      </GoogleMap>
      
      
      
      <p style={{ marginTop: '10px', fontSize: 'small' }}>
        *Note: The map will re-center to the location you click.*
      </p>
    </div>
  );
}

export default Menu
