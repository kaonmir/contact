import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../../color";
import {
  Profile,
  SimpleProfile,
  SimpleProfiles,
} from "../../model/@types/Profile";

import ProfileModel from "../../model/profileModel";
import SimpleProfileComp from "../components/SimpleProfile";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";

const atoz = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode("A".charCodeAt(0) + i)
);

type Props = NativeStackScreenProps<RootStackParamList, "Phone">;

export default function PhoneScreen({ navigation }: Props) {
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState<{ [a: string]: SimpleProfiles }>({}); // A: [profiles~]

  const loadProfiles = () => {
    const newProfiles: { [a: string]: SimpleProfiles } = {};

    atoz.forEach((a) => {
      newProfiles[a] = ProfileModel.loadSimpleProfiles()
        .filter(({ full_name }) => full_name[0] === a)
        .sort((A, B) => A.full_name.localeCompare(B.full_name));
    });
    setProfiles(newProfiles);
  };

  useEffect(() => loadProfiles(), []);

  const onPressProfile = (profile: SimpleProfile) => {
    navigation.navigate("Profile", { id: profile.id });
  };

  if (profiles === {}) return <Text> Loading...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="search" size={20} color={theme.grey400} />
        <TextInput
          style={styles.header_textinput}
          placeholder="Search Content"
          onChangeText={setValue}
          value={value}
        />
      </View>
      <ScrollView style={styles.body}>
        {atoz
          .filter((a) => profiles[a] && profiles[a].length !== 0)
          .map((a, idx) => (
            <View style={styles.box} key={idx}>
              <Text style={styles.alphabet}> {a} </Text>
              <View>
                {profiles[a].map((profile, idx) => (
                  <SimpleProfileComp
                    key={idx}
                    image={profile.image}
                    name={`${profile.title} ${profile.full_name}`}
                    content={profile.content}
                    tags={profile.tags}
                    onPress={() => onPressProfile(profile)}
                  />
                ))}
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

//TODO: Tag, Component로 바꾸기
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.grey100,

    marginTop: 40,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 5,
  },
  header_textinput: {
    flex: 1,
    fontSize: 15,
    paddingLeft: 10,
  },
  body: { marginTop: 7 },
  box: { marginBottom: 5 },
  alphabet: {
    marginStart: 13,
    color: "blue",
    fontSize: 14,
    marginBottom: 6,
  },
});
