import React from 'react';
import { useParams } from 'react-router-dom';

const ViewVideo = () => {
  const { id } = useParams();
  const videoUrl = `https://embed.api.video/live/${id}`;

  return (
    <div>
      <h2>Live View</h2>
      <iframe
        title="Live Stream"
        width="720"
        height="480"
        src={videoUrl}
        allow="autoplay"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ViewVideo;
