import React, { useState, useEffect, useRef } from 'react';
import api from '@/api/axios';
import toast from 'react-hot-toast';

interface AudioPrompt {
  id: string;
  url: string;
  createdAt: string;
}

interface AudioPromptUploaderProps {
  ritualId: string;
}

export const AudioPromptUploader: React.FC<AudioPromptUploaderProps> = ({ ritualId }) => {
  const [prompts, setPrompts] = useState<AudioPrompt[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing prompts for this ritual
  useEffect(() => {
    api.get<AudioPrompt[]>(`/rituals/${ritualId}/audio-prompts`)
      .then(res => setPrompts(res.data))
      .catch(() => toast.error('Failed to load audio prompts'));
  }, [ritualId]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('audio/')) {
      toast.error('Please select an audio file');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('ritualId', ritualId);
      const res = await api.post<AudioPrompt>(`/audio-prompts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPrompts(prev => [...prev, res.data]);
      toast.success('Audio prompt uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Audio Prompts</h3>
      <div className="flex items-center space-x-2">
        <input
          type="file"
          accept="audio/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={uploading}
          className="text-sm text-gray-900 dark:text-gray-100"
        />
        {uploading && <span className="text-gray-500">Uploading...</span>}
      </div>
      <ul className="space-y-2">
        {prompts.map(p => (
          <li key={p.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded">
            <audio controls src={p.url} className="flex-1" />
            <span className="ml-4 text-xs text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</span>
          </li>
        ))}
        {prompts.length === 0 && <li className="text-gray-500">No audio prompts yet.</li>}
      </ul>
    </div>
  );
};
