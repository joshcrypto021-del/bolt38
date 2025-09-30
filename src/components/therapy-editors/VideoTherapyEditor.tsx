import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Video, Link as LinkIcon, Image } from 'lucide-react';
import { VideoContent } from '../../types/therapyContent';

interface VideoTherapyEditorProps {
  data: { videos: VideoContent[] };
  onChange: (data: { videos: VideoContent[] }) => void;
}

export default function VideoTherapyEditor({ data, onChange }: VideoTherapyEditorProps) {
  const addVideo = () => {
    const newVideo: VideoContent = {
      id: `video_${Date.now()}`,
      title: 'New Video Session',
      url: '',
      duration: 1200,
      description: 'Video description',
      thumbnailUrl: ''
    };
    onChange({ videos: [...data.videos, newVideo] });
  };

  const removeVideo = (id: string) => {
    onChange({ videos: data.videos.filter(v => v.id !== id) });
  };

  const updateVideo = (id: string, field: keyof VideoContent, value: any) => {
    onChange({
      videos: data.videos.map(v =>
        v.id === id ? { ...v, [field]: value } : v
      )
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Video className="w-5 h-5" />
          <span>Video Library</span>
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addVideo}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Video</span>
        </motion.button>
      </div>

      {data.videos.length === 0 ? (
        <div className="bg-gray-700 rounded-lg p-8 text-center border border-dashed border-gray-600">
          <Video className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400">No videos added yet</p>
          <p className="text-gray-500 text-sm mt-1">Click "Add Video" to upload or link video content</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.videos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600"
            >
              <div className="flex items-start justify-between mb-3">
                <input
                  type="text"
                  value={video.title}
                  onChange={(e) => updateVideo(video.id, 'title', e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Video title"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeVideo(video.id)}
                  className="ml-2 p-2 text-red-400 hover:bg-red-400 hover:bg-opacity-10 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={video.url}
                    onChange={(e) => updateVideo(video.id, 'url', e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Video URL (YouTube, Vimeo, or direct MP4 link)"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Image className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={video.thumbnailUrl || ''}
                    onChange={(e) => updateVideo(video.id, 'thumbnailUrl', e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Thumbnail URL (optional)"
                  />
                </div>

                <textarea
                  value={video.description}
                  onChange={(e) => updateVideo(video.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Video description and session goals"
                />

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Duration (seconds)</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={video.duration}
                      onChange={(e) => updateVideo(video.id, 'duration', parseInt(e.target.value) || 0)}
                      className="w-32 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                    <span className="text-sm text-gray-400">
                      ({formatTime(video.duration)})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
        <h4 className="text-blue-200 font-semibold mb-2">Video Guidelines</h4>
        <ul className="text-blue-300 text-sm space-y-1">
          <li>• Supports YouTube, Vimeo, and direct MP4 URLs</li>
          <li>• Recommended: Use professional therapeutic content only</li>
          <li>• Add clear session titles and descriptions</li>
          <li>• Include estimated duration for patient planning</li>
        </ul>
      </div>
    </div>
  );
}
