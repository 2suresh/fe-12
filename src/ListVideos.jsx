import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/list')
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);
  

  return (
    <div>
      <h2>Live Streams</h2>
      <ul>
        {videos.map(video => (
          <li key={video.liveStreamId}>
            <Link to={`/view/${video.liveStreamId}`}>{video.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListVideos;
