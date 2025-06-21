export interface ResponseData {
  status: boolean;
  data: Data;
}

export interface Data {
  media_url: string;
  description: string;
  verified: boolean;
  accuracy: number;
}
