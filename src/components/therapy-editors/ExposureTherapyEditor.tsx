import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Eye, AlertTriangle, Clock } from 'lucide-react';
import { ExposureLevel } from '../../types/therapyContent';

interface ExposureTherapyEditorProps {
  data: { exposureLevels: ExposureLevel[]; safetyPlan: string };
  onChange: (data: { exposureLevels: ExposureLevel[]; safetyPlan: string }) => void;
}

export default function ExposureTherapyEditor({ data, onChange }: ExposureTherapyEditorProps) {
  const addLevel = () => {
    const newLevel: ExposureLevel = {
      id: `level_${Date.now()}`,
      level: data.exposureLevels.length + 1,
      title: 'New Exposure Level',
      description: 'Description of exposure exercise',
      duration: 10,
      intensity: 'Low',
      instructions: ['Step 1', 'Step 2', 'Step 3']
    };
    onChange({ ...data, exposureLevels: [...data.exposureLevels, newLevel] });
  };

  const removeLevel = (id: string) => {
    const filtered = data.exposureLevels.filter(l => l.id !== id);
    const reordered = filtered.map((l, idx) => ({ ...l, level: idx + 1 }));
    onChange({ ...data, exposureLevels: reordered });
  };

  const updateLevel = (id: string, field: keyof ExposureLevel, value: any) => {
    onChange({
      ...data,
      exposureLevels: data.exposureLevels.map(l =>
        l.id === id ? { ...l, [field]: value } : l
      )
    });
  };

  const updateInstructions = (id: string, instructions: string[]) => {
    updateLevel(id, 'instructions', instructions);
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-red-200 font-semibold mb-2">Safety Plan</h4>
            <textarea
              value={data.safetyPlan}
              onChange={(e) => onChange({ ...data, safetyPlan: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-red-900 bg-opacity-30 border border-red-700 rounded text-red-100 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter safety guidelines and emergency procedures for patients..."
            />
            <p className="text-red-300 text-xs mt-2">
              Critical: Patients should only begin exposure therapy under professional guidance
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Eye className="w-5 h-5" />
          <span>Exposure Hierarchy Levels</span>
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addLevel}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Level</span>
        </motion.button>
      </div>

      <div className="space-y-4">
        {data.exposureLevels
          .sort((a, b) => a.level - b.level)
          .map((level) => (
            <div
              key={level.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                    {level.level}
                  </div>
                  <input
                    type="text"
                    value={level.title}
                    onChange={(e) => updateLevel(level.id, 'title', e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Level title"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeLevel(level.id)}
                  className="ml-2 p-2 text-red-400 hover:bg-red-400 hover:bg-opacity-10 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-3">
                <textarea
                  value={level.description}
                  onChange={(e) => updateLevel(level.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Level description"
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Intensity</label>
                    <select
                      value={level.intensity}
                      onChange={(e) => updateLevel(level.id, 'intensity', e.target.value as 'Low' | 'Medium' | 'High')}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      <Clock className="w-3 h-3 inline mr-1" />
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={level.duration}
                      onChange={(e) => updateLevel(level.id, 'duration', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-2">Instructions (one per line)</label>
                  <textarea
                    value={level.instructions.join('\n')}
                    onChange={(e) => updateInstructions(level.id, e.target.value.split('\n').filter(i => i.trim()))}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="Enter each instruction on a new line"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
        <h4 className="text-blue-200 font-semibold mb-2">Exposure Therapy Guidelines</h4>
        <ul className="text-blue-300 text-sm space-y-1">
          <li>• Start with low-intensity exposures and gradually increase</li>
          <li>• Each level should be manageable but challenging</li>
          <li>• Include clear, step-by-step instructions for safety</li>
          <li>• Patients should track anxiety levels before, during, and after</li>
          <li>• Always provide emergency contacts and coping strategies</li>
        </ul>
      </div>
    </div>
  );
}
