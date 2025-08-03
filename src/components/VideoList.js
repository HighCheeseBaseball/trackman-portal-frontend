import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function VideoList({ playerName }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the new user-videos endpoint that filters by PlayerID
        const response = await axios.get(`https://trackman-portal-backend.onrender.com/api/user-videos?username=${playerName}`);
        
        if (response.data) {
          setVideos(response.data);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to fetch videos. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (playerName) {
      fetchVideos();
    }
  }, [playerName]);

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`https://trackman-portal-backend.onrender.com/videos/${filename}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', margin: '20px' }}>Loading videos...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', margin: '20px', color: 'red' }}>{error}</div>;
  }

  if (videos.length === 0) {
    return <div style={{ textAlign: 'center', margin: '20px' }}>No videos found for your PlayerID.</div>;
  }

  return (
    <div style={{ margin: 20 }}>
      <h2>Your Videos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {videos.map((video, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: 15, borderRadius: 8 }}>
            <h3>{video.player}</h3>
            <p>Date: {video.date}</p>
            <video 
              controls 
              style={{ width: '100%', maxHeight: 200 }}
              src={`https://trackman-portal-backend.onrender.com/videos/${video.filename}`}
            >
              Your browser does not support the video tag.
            </video>
            <button 
              onClick={() => handleDownload(video.filename)}
              style={{ 
                marginTop: 10, 
                padding: '8px 16px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
