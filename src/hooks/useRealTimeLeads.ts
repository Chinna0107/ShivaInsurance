import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';

export const leadEventEmitter = new EventTarget();

let globalSocket: Socket | null = null;

// We will use a reliable 16-second alarm sound from Google's sound library
const CHIME_URL = 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg';

export const useRealTimeLeads = () => {
  useEffect(() => {
    if (!globalSocket) {
      globalSocket = io('https://shiva-be.vercel.app');
    }

    const handleConnect = () => {
      console.log('Connected to real-time notification server');
    };

    const handleNewLead = (lead: any) => {
      console.log('New lead received via websocket:', lead);
      
      try {
        const audio = new Audio(CHIME_URL);
        audio.play().catch(e => console.warn('Audio play prevented by browser policy:', e));
      } catch (err) {
        console.error('Failed to play sound', err);
      }

      toast.success(`🔔 New Lead Received from ${lead.name}!`, {
        duration: 5000,
        position: 'top-right',
        style: {
          background: 'var(--primary-color)',
          color: '#fff',
          fontWeight: 'bold',
          padding: '16px'
        },
      });

      // Dispatch global event so tables can update
      leadEventEmitter.dispatchEvent(new CustomEvent('new-lead', { detail: lead }));
    };

    const handleNewCallRequest = (newCall: any) => {
      try {
        const audio = new Audio(CHIME_URL);
        audio.play().catch(e => console.warn('Audio play prevented by browser policy:', e));
      } catch (err) {
        console.error('Failed to play sound', err);
      }
      
      toast.success(`📞 New Call Request from ${newCall.name}!`, {
        duration: 5000,
        position: 'top-right',
        style: {
          border: '1px solid #3b82f6',
          padding: '16px',
          color: '#1e3a8a',
          fontWeight: 500
        },
      });
      
      leadEventEmitter.dispatchEvent(new CustomEvent('new-call-request', { detail: newCall }));
    };

    globalSocket.on('connect', handleConnect);
    globalSocket.on('new-lead', handleNewLead);
    globalSocket.on('new-call-request', handleNewCallRequest);

    return () => {
      if (globalSocket) {
        globalSocket.off('connect', handleConnect);
        globalSocket.off('new-lead', handleNewLead);
        globalSocket.off('new-call-request', handleNewCallRequest);
      }
    };
  }, []);
};
