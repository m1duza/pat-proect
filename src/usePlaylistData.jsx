import { useEffect, useState } from 'react';

function usePlaylistData(sourceUrl) {
  const [playlistData, setPlaylistData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(sourceUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON content");
        }
        
        const data = await response.json();
        setPlaylistData(data);
      } catch (error) {
        console.error("Error loading playlist:", error.message);
      }
    };
    
    fetchData();
  }, [sourceUrl]);

  return playlistData;
}

export default usePlaylistData;
