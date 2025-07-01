
import { TransformationOptionsState, OptionConfig } from './types';

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const DEFAULT_TRANSFORMATION_OPTIONS: TransformationOptionsState = {
  synonymReplacement: true,
  sentenceStructureVariation: true,
  contractionInsertion: false,
  aiTropesReduction: true,
};

export const TRANSFORMATION_OPTIONS_CONFIG: OptionConfig[] = [
  {
    id: 'synonymReplacement',
    label: 'Synonym Replacement',
    description: 'Vary word choices using contextually appropriate synonyms.',
  },
  {
    id: 'sentenceStructureVariation',
    label: 'Sentence Structure Variation',
    description: 'Modify sentence lengths and structures for a more dynamic flow.',
  },
  {
    id: 'contractionInsertion',
    label: 'Contraction Insertion',
    description: 'Use contractions (e.g., "don\'t") for a less formal tone.',
  },
  {
    id: 'aiTropesReduction',
    label: 'AI Trope Reduction',
    description: 'Identify and rephrase common AI phrases and overly formal language.',
  },
];

export const INITIAL_INTENSITY = 50; // Default intensity (0-100)
