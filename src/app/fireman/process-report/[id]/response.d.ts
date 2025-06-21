export interface Response {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  validation: Validation;
  report: Report;
  group: Group;
  fireman_report_group: FiremanReportGroup[];
}

export interface FiremanReportGroup {
  id: number;
  group_id: number;
  fireman: Fireman;
}

export interface Fireman {
  id: number;
  name: string;
  email: string;
  longitude: number;
  latitude: number;
}

export interface Group {
  id: number;
  location_name: string;
  longitude: number;
  latitude: number;
  status: string;
  created_at: string;
  updated_at: string;
  fireman_report_group: FiremanReportGroup[];
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
  created_at: string;
  updated_at: string;
}

export interface Validation {
  id: number;
  verified: boolean;
  accuracy: number;
  notes: string;
}
