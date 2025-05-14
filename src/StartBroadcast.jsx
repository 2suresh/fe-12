// import React, { useState } from 'react';

// const StartBroadcast = () => {
//   const [name, setName] = useState('');
//   const [streamKey, setStreamKey] = useState(null);

//   const createStream = async () => {
//     const res = await fetch('http://localhost:5555/start', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name })
//     });
//     const data = await res.json();
//     setStreamKey(data.streamKey);
//   };

//   return (
//     <div>
//       <h2>Start New Broadcast</h2>
//       <input placeholder="Stream Name" value={name} onChange={e => setName(e.target.value)} />
//       <button onClick={createStream}>Create</button>

//       {streamKey && (
//         <div>
//           <p>Stream Key: {streamKey}</p>
//           <p>
//             Use browser-based streaming like <a href="https://obs.ninja" target="_blank" rel="noreferrer">OBS.Ninja</a>
//             , or browser WebRTC tool with RTMP URL: <code>rtmp://broadcast.api.video/s</code>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StartBroadcast;

import React, { useRef, useState } from 'react';

const StartBroadcast = () => {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  let mediaRecorder;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

      mediaRecorder.ondataavailable = async (e) => {
        if (e.data.size > 0) {
          const formData = new FormData();
          formData.append('video', e.data, 'chunk.webm');

          try {
            await fetch('http://localhost:5555/upload-chunk', {
              method: 'POST',
              body: formData,
            });
            console.log('Chunk sent to server');
          } catch (err) {
            console.error('Failed to send chunk:', err);
          }
        }
      };

      mediaRecorder.start(3000); // send data every 3 seconds
      setRecording(true);
    } catch (err) {
      console.error('Error accessing media devices.', err);
    }
  };

  return (
    <div>
      <h2>Start Broadcasting</h2>
      <video ref={videoRef} width="640" height="360" autoPlay muted></video>
      <br />
      <button onClick={startRecording} disabled={recording}>
        {recording ? 'Broadcasting...' : 'Start Broadcasting'}
      </button>
    </div>
  );
};

export default StartBroadcast;


