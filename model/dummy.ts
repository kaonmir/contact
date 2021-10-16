import { PersonalHistory, Profile, SimpleProfiles } from "./@types/Profile";

import Sample0 from "../assets/Sample0.png";
import Sample1 from "../assets/Sample1.png";
import Sample2 from "../assets/Sample2.png";
import Sample3 from "../assets/Sample3.png";
import Sample4 from "../assets/Sample4.png";
import Sample5 from "../assets/Sample5.png";
import Sample6 from "../assets/Sample6.png";

export const contacts_profiles: SimpleProfiles = [
  {
    id: 1,
    image: Sample0,
    title: "CPL",
    full_name: "Son, Sunghun",
    content: "010-1234-5678",
    tags: ["USFK", "J37", "support", "male"],
  },
  {
    id: 2,
    image: Sample1,
    title: "PFC",
    full_name: "White, Alex",
    content: "010-2345-6789",
    tags: ["CJ37"],
  },
  {
    id: 3,
    image: Sample1,
    title: "PFC",
    full_name: "White, Alex",
    content: "010-2345-6789",
    tags: ["2ID", "CMDR"],
  },
  {
    id: 4,
    image: Sample2,
    title: "SSG",
    full_name: "Casiano, Glenn D.",
    content: "010-315-722-6223",
    tags: ["CMST"],
  },
  {
    id: 5,
    image: Sample3,
    title: "COL",
    full_name: "Brown, Loyd W.",
    content: "02-245-5753",
    tags: [],
  },
  {
    id: 7,
    image: Sample2,
    title: "SSG",
    full_name: "Casiano, Glenn D.",
    content: "010-315-722-6223",
    tags: [],
  },
  {
    id: 8,
    image: Sample3,
    title: "COL",
    full_name: "Brian, Allgood W.",
    content: "02-245-5753",
    tags: ["asdf"],
  },
];

export const profile: Profile = {
  id: 1,
  image: Sample0,
  title: "CPL",
  full_name: "Son, Sunghun",
  contacts: [
    {
      icon: "phone",
      name: "Commercial",
      content: "+82 010-1234-5678",
    },
    {
      icon: "phone",
      name: "DSN",
      content: "315-722-6223",
    },
    {
      icon: "email",
      name: "NIPR",
      content: "sunghun.son.fm@mail.mil",
    },
  ],
  tags: ["USFK", "J37", "support", "KATUSA", "Male", "Man", "Yorosiku Ona"],
};

export const personal_history: PersonalHistory[] = [
  {
    date: "2021-10-12 22:25:25",
    content: "010-1234-5678",
    call_type: "incoming",
    call_time: 132,
  },
  {
    date: "2021-10-12 14:25:25",
    content: "010-1234-5678",
    call_type: "missed_incoming",
  },
  {
    date: "2021-10-11 22:20:25",
    content: "010-1234-5678",
    call_type: "outgoing",
    call_time: 550,
  },
  {
    date: "2021-10-11 11:20:25",
    content: "010-1234-5678",
    call_type: "missed_outgoing",
  },
  {
    date: "2021-10-11 02:25:25",
    content: "010-1234-5678",
    call_type: "message_incoming",
    message:
      "All you have to is stay a second, just take your time. The clock is ticking",
  },
  {
    date: "2021-10-10 22:20:25",
    content: "010-1234-5678",
    call_type: "outgoing",
    call_time: 550,
  },
  {
    date: "2021-10-10 02:25:25",
    content: "010-1234-5678",
    call_type: "message_outgoing",
    message: "Oh, did you want me to change?",
  },
];
