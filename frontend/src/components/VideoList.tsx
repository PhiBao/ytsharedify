import React, { useEffect, useState } from 'react';

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div>
      <h2>List of Shared Videos</h2>
      {videos.length > 0 ? (
        <ul>
          {videos.map((video: any) => (
            <li key={video.id}>
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No videos shared yet.</p>
      )}
    </div>
  );
};

export default VideoList;