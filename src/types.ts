export type Arguments = {
  method: string
  parameters: string[]
};

export type Result = {
  Title: string
  Subtitle: string
  JsonRPCAction?: {
    method: string
    parameters: string[]
  }
  IcoPath?: string
  score?: number
};
