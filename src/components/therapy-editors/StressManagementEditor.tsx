import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Target, Clock } from 'lucide-react';
import { StressManagementTechnique } from '../../types/therapyContent';

interface StressManagementEditorProps {
  data: { techniques: StressManagementTechnique[] };
  onChange: (data: { techniques: StressManagementTechnique[] }) => void;
}

const categories = ['Physical', 'Mental', 'Emotional', 'Behavioral', 'Social'];

export default function StressManagementEditor({ data, onChange }: StressManagementEditorProps) {
  const addTechnique = () => {
    const newTechnique: StressManagementTechnique = {
      id: `technique_${Date.now()}`,
      title: 'New Stress Management Technique',
      description: 'Description of the technique',
      steps: ['Step 1', 'Step 2', 'Step 3'],
      duration: 10,
      category: 'Physical'
    };
    onChange({ techniques: [...data.techniques, newTechnique] });
  };

  const removeTechnique = (id: string) => {
    onChange({ techniques: data.techniques.filter(t => t.id !== id) });
  };

  const updateTechnique = (id: string, field: keyof StressManagementTechnique, value: any) => {
    onChange({
      techniques: data.techniques.map(t =>
        t.id === id ? { ...t, [field]: value } : t
      )
    });
  };

  const updateSteps = (id: string, steps: string[]) => {
    updateTechnique(id, 'steps', steps);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>Stress Management Techniques</span>
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addTechnique}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Technique</span>
        </motion.button>
      </div>

      <div className="space-y-4">
        {data.techniques.map((technique) => (
          <div
            key={technique.id}
            className="bg-gray-700 rounded-lg p-4 border border-gray-600"
          >
            <div className="flex items-start justify-between mb-3">
              <input
                type="text"
                value={technique.title}
                onChange={(e) => updateTechnique(technique.id, 'title', e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Technique title"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeTechnique(technique.id)}
                className="ml-2 p-2 text-red-400 hover:bg-red-400 hover:bg-opacity-10 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="space-y-3">
              <textarea
                value={technique.description}
                onChange={(e) => updateTechnique(technique.id, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Technique description"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Category</label>
                  <select
                    value={technique.category}
                    onChange={(e) => updateTechnique(technique.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={technique.duration}
                    onChange={(e) => updateTechnique(technique.id, 'duration', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-2">Steps (one per line)</label>
                <textarea
                  value={technique.steps.join('\n')}
                  onChange={(e) => updateSteps(technique.id, e.target.value.split('\n').filter(s => s.trim()))}
                  rows={5}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  placeholder="Enter each step on a new line"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
