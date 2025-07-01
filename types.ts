
export interface TransformationOptionsState {
  synonymReplacement: boolean;
  sentenceStructureVariation: boolean;
  contractionInsertion: boolean;
  aiTropesReduction: boolean;
}

export type TransformationOptionKey = keyof TransformationOptionsState;

export interface OptionConfig {
  id: TransformationOptionKey;
  label: string;
  description: string;
}
