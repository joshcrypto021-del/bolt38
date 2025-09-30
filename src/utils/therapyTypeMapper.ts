import { TherapyContentData } from '../types/therapyContent';

export const therapyTitleToTypeMap: Record<string, keyof TherapyContentData> = {
  'CBT Thought Records': 'cbt_thought_records',
  'Mindfulness & Breathing': 'mindfulness_breathing',
  'Relaxation Music': 'relaxation_music',
  'Art & Color Therapy': 'art_therapy',
  'Video Therapy': 'video_therapy',
  'Exposure Therapy': 'exposure_therapy',
  'Stress Management': 'stress_management',
  'Gratitude Journal': 'gratitude',
  'Tetris Therapy': 'tetris_therapy',
  'Acceptance & Commitment Therapy': 'act_therapy'
};

export const therapyCategoryToTypeMap: Record<string, keyof TherapyContentData> = {
  'CBT': 'cbt_thought_records',
  'Mindfulness': 'mindfulness_breathing',
  'Music Therapy': 'relaxation_music',
  'Art Therapy': 'art_therapy',
  'Video Therapy': 'video_therapy',
  'Exposure': 'exposure_therapy',
  'Stress': 'stress_management',
  'Positive Psychology': 'gratitude',
  'Game Therapy': 'tetris_therapy',
  'ACT': 'act_therapy'
};

export function getTherapyTypeFromTherapy(title: string, category: string): keyof TherapyContentData {
  return therapyTitleToTypeMap[title] || therapyCategoryToTypeMap[category] || 'cbt_thought_records';
}
