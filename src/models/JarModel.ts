export interface JarModel {
  name: string;
  leader: string;
  common_purpose: string;
  jar_filling_action: string;
  cost_per_action: number;
  goal_amount: number;
  current_amount: number;
  contributions: object;
  invitations?: object;
}
