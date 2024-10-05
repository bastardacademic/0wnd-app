import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, fetchMessages } from '../../redux/actions/chatActions';
import { preventScreenshot } from '../../utils/screenshotPrevention';

const ChatWindow = ({ receiverId }) => {
  const [message, setMessage] = useState('');
  const [burnOnViewMedia, setBurnOnViewMedia] = useState(null);  // For burn-on-view media
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchMessages(receiverId));
  }, [dispatch, receiverId]);

  const handleMediaView = (mediaId) => {
    preventScreenshot();  // Call function to disable screenshots

    setTimeout(() => {
      setBurnOnViewMedia(null);  // Auto-delete media after 20 seconds
    }, 20000);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (burnOnViewMedia) {
      dispatch(sendMessage(receiverId, message, { burnOnView: true }));
      setBurnOnViewMedia(null);
    } else {
      dispatch(sendMessage(receiverId, message));
    }
    setMessage('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg) => (
          <div key={msg._id}>
            <p>{msg.content}</p>
            {msg.media && (
              <div onClick={() => handleMediaView(msg.mediaId)}>
                <img src={msg.mediaUrl} alt="Media" />
                <span className="watermark">Sender: {msg.sender}</span> {/* Watermark added */}
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
