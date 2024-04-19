import React, { useState } from 'react';

const VideoShare: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleVideoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const handleVideoShare = () => {
    // TODO: Implement video sharing logic
    console.log('Video shared:', videoUrl);
  };

  return (
    <div>
      <h2>Share a YouTube Video</h2>
      <input type="text" value={videoUrl} onChange={handleVideoUrlChange} placeholder="Enter YouTube video URL" />
      <button onClick={handleVideoShare}>Share</button>
    </div>
  );
};

export default VideoShare;