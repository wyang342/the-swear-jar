export interface JarData {
  name: string;
  leader: string;
  members: {
    [uid: string]: string;
  };
  common_purpose: string;
  jar_filling_action: string;
  cost_per_action: number;
  goal_amount: number;
  current_amount: number;
  contributions: {
    [uid: string]: number;
  };
}
