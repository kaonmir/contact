import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersonalHistory, Profile, SimpleProfiles } from "./@types/Profile";
import * as dummy from "./dummy";

const ProfileModel = {
  loadSimpleProfiles: (): SimpleProfiles => dummy.contacts_profiles,
  saveSimpleProfiles: () => {},

  getProfile: (id: number): Profile => dummy.profile,
  getHistory: (id: number): PersonalHistory[] => dummy.personal_history,
};

export default ProfileModel;
