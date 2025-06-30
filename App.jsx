import { useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi, I'm Auris — how can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMsgs = [...messages, { role: 'user', content: input }];
    setMessages(updatedMsgs);
    setInput('');
    setLoading(true);

    const res = await fetch('https://auris-widget-backend.vercel.app/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedMsgs })
    });

    const data = await res.json();
    setMessages([...updatedMsgs, { role: 'assistant', content: data.reply }]);
    setLoading(false);
  };

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      {messages.map((msg, i) => (
        <div key={i} style={{ marginBottom: 10, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: msg.role === 'user' ? '#B66A61' : '#f0f0f0',
            color: msg.role === 'user' ? 'white' : 'black',
            padding: '10px 14px',
            borderRadius: 12,
            maxWidth: '80%'
          }}>
            {msg.content}
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit} style={{ marginTop: 20, display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flexGrow: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}
          placeholder="Ask a question..."
        />
        <button type="submit" style={{ padding: '10px 16px', backgroundColor: '#B66A61', color: 'white', borderRadius: 8, border: 'none' }}>
          Send
        </button>
      </form>
    </div>
  );
}
