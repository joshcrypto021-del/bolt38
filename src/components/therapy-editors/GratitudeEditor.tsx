import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Heart, ToggleLeft, ToggleRight } from 'lucide-react';
import { GratitudePrompt } from '../../types/therapyContent';

interface GratitudeEditorProps {
  data: { prompts: GratitudePrompt[]; streakEnabled: boolean };
  onChange: (data: { prompts: GratitudePrompt[]; streakEnabled: boolean }) => void;
}

const categories = ['Daily', 'Relationships', 'Personal Growth', 'Achievements', 'Nature', 'Health'];

export default function GratitudeEditor({ data, onChange }: GratitudeEditorProps) {
  const addPrompt = () => {
    const newPrompt: GratitudePrompt = {
      id: `prompt_${Date.now()}`,
      prompt: 'What are you grateful for today?',
      category: 'Daily'
    };
    onChange({ ...data, prompts: [...data.prompts, newPrompt] });
  };

  const removePrompt = (id: string) => {
    onChange({ ...data, prompts: data.prompts.filter(p => p.id !== id) });
  };

  const updatePrompt = (id: string, field: keyof GratitudePrompt, value: any) => {
    onChange({
      ...data,
      prompts: data.prompts.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-semibold mb-1">Streak Tracking</h4>
            <p className="text-gray-400 text-sm">Enable daily streak tracking for gratitude entries</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange({ ...data, streakEnabled: !data.streakEnabled })}
            className={`p-2 rounded-lg transition-colors ${
              data.streakEnabled
                ? 'bg-green-600 text-white'
                : 'bg-gray-600 text-gray-400'
            }`}
          >
            {data.streakEnabled ? (
              <ToggleRight className="w-8 h-8" />
            ) : (
              <ToggleLeft className="w-8 h-8" />
            )}
          </motion.button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Heart className="w-5 h-5" />
          <span>Gratitude Prompts</span>
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addPrompt}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Prompt</span>
        </motion.button>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {data.prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="bg-gray-700 rounded-lg p-4 border border-gray-600"
          >
            <div className="flex items-start justify-between mb-3">
              <select
                value={prompt.category}
                onChange={(e) => updatePrompt(prompt.id, 'category', e.target.value)}
                className="px-3 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removePrompt(prompt.id)}
                className="ml-2 p-1 text-red-400 hover:bg-red-400 hover:bg-opacity-10 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>

            <textarea
              value={prompt.prompt}
              onChange={(e) => updatePrompt(prompt.id, 'prompt', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter gratitude prompt question"
            />
          </div>
        ))}
      </div>

      <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-4">
        <h4 className="text-green-200 font-semibold mb-2">Gratitude Practice Tips</h4>
        <ul className="text-green-300 text-sm space-y-1">
          <li>• Encourage specific, detailed responses</li>
          <li>• Vary prompt categories for diverse reflection</li>
          <li>• Include both simple daily gratitudes and deeper reflections</li>
          <li>• Prompts should be open-ended and thought-provoking</li>
        </ul>
      </div>
    </div>
  );
}
