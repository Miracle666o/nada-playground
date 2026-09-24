export type InputType = 
  | 'PublicInteger' 
  | 'PublicUnsignedInteger' 
  | 'SecretInteger' 
  | 'SecretUnsignedInteger';

export interface ProgramInput {
  name: string;
  type: InputType;
  value: number;
  party: string;
}

export interface ProgramOutput {
  name: string;
  value: number;
  party: string;
}

export interface ExampleProgram {
  name: string;
  code: string;
  inputs: ProgramInput[];
  description?: string;
}

export interface GitHubLoadResult {
  code: string;
  inputs?: ProgramInput[];
}