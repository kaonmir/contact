import { ImageSourcePropType } from "react-native";

export type SimpleProfile = {
  id: number;
  image: ImageSourcePropType;
  title: string;
  full_name: string;
  content: string; // Representative number
  tags: string[];
};

export type SimpleProfiles = SimpleProfile[];

export type Profile = {
  id: number;
  image: ImageSourcePropType;
  title: string;
  full_name: string;
  tags: string[];
  contacts: Contact[];
};

export type ContactType = "phone" | "email";

export type Contact = {
  icon: ContactType;
  name: string;
  content: string; // number or email
};

export type AllHistory = {
  title: string;
  full_name: string;

  date: Date;
  content: string;
  call_type: CallType;
}[];

export type PersonalHistory = {
  date: string; // yyyy-mm-dd hh:mm:ss
  content: string;
  call_type: CallType;

  call_time?: number; // second
  message?: string;
};

export type CallType =
  | "incoming"
  | "outgoing"
  | "missed_incoming"
  | "missed_outgoing"
  | "message_incoming"
  | "message_outgoing";
