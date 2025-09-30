import React from 'react';
import { Palette, Gamepad2, Star } from 'lucide-react';

interface SimpleContentEditorProps {
  therapyType: 'art_therapy' | 'tetris_therapy' | 'act_therapy';
  data: any;
  onChange: (data: any) => void;
}

export default function SimpleContentEditor({ therapyType, data, onChange }: SimpleContentEditorProps) {
  const getIcon = () => {
    switch (therapyType) {
      case 'art_therapy':
        return <Palette className="w-12 h-12 text-pink-400" />;
      case 'tetris_therapy':
        return <Gamepad2 className="w-12 h-12 text-cyan-400" />;
      case 'act_therapy':
        return <Star className="w-12 h-12 text-teal-400" />;
    }
  };

  const getTitle = () => {
    switch (therapyType) {
      case 'art_therapy':
        return 'Art & Color Therapy';
      case 'tetris_therapy':
        return 'Tetris Therapy';
      case 'act_therapy':
        return 'ACT Therapy';
    }
  };

  const getDescription = () => {
    switch (therapyType) {
      case 'art_therapy':
        return 'Art therapy uses the patient module\'s built-in drawing tools and color therapy exercises. No additional configuration needed - patients access the interactive canvas directly.';
      case 'tetris_therapy':
        return 'Tetris therapy uses the patient module\'s built-in game engine. Research shows playing Tetris after traumatic events can reduce intrusive memories. No configuration needed.';
      case 'act_therapy':
        return 'ACT therapy uses the patient module\'s values clarification and mindfulness exercises. The structured program is pre-configured in the patient experience.';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="bg-gray-700 rounded-2xl p-8 max-w-2xl text-center border border-gray-600">
        <div className="mb-6 flex justify-center">
          {getIcon()}
        </div>

        <h3 className="text-2xl font-bold text-white mb-4">
          {getTitle()}
        </h3>

        <p className="text-gray-300 mb-6 leading-relaxed">
          {getDescription()}
        </p>

        <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
          <p className="text-blue-200 text-sm">
            <strong>Note:</strong> This therapy type is fully integrated into the patient experience module.
            You can still configure general settings (title, description, duration) in the General Settings tab.
          </p>
        </div>
      </div>
    </div>
  );
}
