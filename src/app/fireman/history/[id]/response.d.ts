export interface Response {
  data: Data;
}

export interface Data {
  id: number;
  validation: Validation;
  report: Report;
  group: Group;
}

export interface Group {
  id: number;
  status: string;
  report_id: number;
  created_at: Date;
  updated_at: Date;
  fireman_report_group: any[];
}

export interface Report {
  id: number;
  media_url: string;
  type: string;
  email: string;
  longitude: number;
  latitude: number;
  location_name: string;
  description: string;
  is_anonymous: boolean;
  is_secret: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Validation {
  id: number;
  verified: boolean;
  accuracy: number;
  created_at: Date;
  updated_at: Date;
}
