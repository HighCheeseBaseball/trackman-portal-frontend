import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VideoList({ player }) {
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!player) return;
    axios
      .get(`https://trackman-portal-backend.onrender.com/api/fetch-videos?player=${encodeURIComponent(player)}`)
      .then(res => setVideos(res.data))
      .catch(err => alert("Failed to fetch videos"));
  }, [player]);

  return (
    <div style={{ margin: 20 }}>
      <h2>Your Videos</h2>
      <ul>
        {videos.map((v, i) => (
          <li key={i}>
            {v.player} ({v.date}) &nbsp;
            <button onClick={() => setSelected(v.filename)}>View</button>
            <a
              href={`https://trackman-portal-backend.onrender.com/videos/${v.filename}`}
              download
              style={{ marginLeft: 10 }}
            >
              Download
            </a>
          </li>
        ))}
      </ul>
      {selected && (
        <div>
          <h3>Now Playing: {selected}</h3>
          <video
            src={`https://trackman-portal-backend.onrender.com/videos/${selected}`}
            controls
            width="600"
            style={{ marginTop: 10 }}
          />
          <br />
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
