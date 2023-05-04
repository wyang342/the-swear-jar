export interface JarData {
  name: string;
  leader: string;
  members: {
    [uid: string]: string;
  };
  common_purpose: string;
  jar_filling_action: string;
  money_per_action: number;
  goal: number;
  current_amount: number;
  contributions: {
    [uid: string]: string;
  };
}

export interface UserJarData {
  [jar_id: string]: string;
}
