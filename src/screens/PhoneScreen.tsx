import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { theme } from "../../color";
import { SimpleProfile, SimpleProfiles } from "../../model/@types/Profile";

import ProfileModel from "../../model/profileModel";
import SimpleProfileComp from "../components/SimpleProfile";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { IconButton } from "react-native-paper";
import searchContact from "../services/SearchContact";
import Tag from "../components/Tag";

const atoz = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode("A".charCodeAt(0) + i)
);
const isBlank = (text: string) => new RegExp(/^ +$/).test(text);

type T = [string, SimpleProfiles];
type Props = NativeStackScreenProps<RootStackParamList, "Phone">;

export default function PhoneScreen({ navigation }: Props) {
  const [profiles, setProfiles] = useState<SimpleProfile[]>([]); // A: [profiles~]
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<string[]>(["sfsdfaadsdfo"]);

  const loadProfiles = () => setProfiles(ProfileModel.loadSimpleProfiles());

  useEffect(() => loadProfiles(), []);

  const formatProfile = (inputProfiles: SimpleProfiles): T[] => {
    const newProfiles = atoz
      .map((a): T => {
        const newPs = inputProfiles
          .filter(({ full_name }) => full_name[0] === a)
          .filter((profile) => searchContact(tags, profile))
          .sort((A, B) => A.full_name.localeCompare(B.full_name));
        return [a, newPs];
      })
      .filter(([_, ps]) => ps.length !== 0);
    return newProfiles;
  };

  const onPressProfile = (id: number) => navigation.navigate("Profile", { id });
  const onChangeSearchText = (text: string) => {
    if (!isBlank(text) && text[text.length - 1] === " ") {
      const keyword = text.trim();
      setTags([...tags, keyword]);
      setSearch("");
    } else setSearch(text);
  };
  const onPressBackKey = () => {
    if (search === "" && tags.length !== 0) {
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  if (profiles === []) return <Text> Loading...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="search" size={20} color={theme.grey400} />
        {tags.map((name, idx) => (
          <Tag key={idx} name={name} />
        ))}
        <TextInput
          style={styles.header_textinput}
          placeholder="Search Content"
          onChangeText={onChangeSearchText}
          onKeyPress={(e) =>
            e.nativeEvent.key === "Backspace" ? onPressBackKey() : null
          }
          value={search}
        />
      </View>
      <ScrollView style={styles.body}>
        {formatProfile(profiles).map(([a, ps], idx) => (
          <View style={styles.box} key={idx}>
            <Text style={styles.alphabet}> {a} </Text>
            <View>
              {ps.map((profile, idx) => (
                <Pressable key={idx} onPress={() => onPressProfile(profile.id)}>
                  <SimpleProfileComp
                    image={profile.image}
                    name={`${profile.title} ${profile.full_name}`}
                    content={profile.content}
                    tags={profile.tags}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <IconButton
        icon="plus"
        size={38}
        color="white"
        style={styles.create_button_icon}
      />
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
  create_button: {
    backgroundColor: "cyan",
  },
  create_button_icon: {
    position: "absolute",
    right: 25,
    bottom: 25,
    backgroundColor: theme.purplePrimary,
  },
});
