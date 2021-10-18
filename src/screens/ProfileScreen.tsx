import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootStackParamList } from ".";
import { FontAwesome } from "@expo/vector-icons";

import { theme } from "../../color";
import { PersonalHistory, Profile } from "../../model/@types/Profile";
import ProfileModel from "../../model/profileModel";
import Tag from "../components/Tag";
import Contact from "../components/Contact";
import History from "../components/HIstory";
import { Menu, Provider } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation, route }: Props) {
  const [profile, setProfile] = useState<Profile>();
  const [isDetail, setIsDetail] = useState(true);
  const [history, setHistory] = useState<Record<string, PersonalHistory[]>>({});
  const [scroller, setScroller] = useState<ScrollView | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const loadProfile = (id: number) => setProfile(ProfileModel.getProfile(id));
  const loadPersonalHistory = (id: number) => {
    const historyList = ProfileModel.getHistory(id);
    const unique_dates = historyList
      .map((h) => h.date.split(" ")[0])
      .filter((v, idx, self) => self.indexOf(v) === idx)
      .sort()
      .reverse();

    const newHistory = unique_dates.map((date) => [
      date,
      historyList
        .filter((h) => h.date.includes(date))
        .sort((A, B) => A.date.localeCompare(B.date)),
    ]);

    setHistory(Object.fromEntries(newHistory));
  };
  const getDateFormat = (input_date: string): string => {
    // Today 12 OCT 2021, Wed
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const date = new Date(input_date);
    const date_str = date.toDateString();
    const arr = date_str.split(" ");
    const newDate = `${arr[2]} ${arr[1]} ${arr[3]}, ${arr[0]}`;

    if (today.toDateString() === date_str) return `Today ${newDate}`;
    if (yesterday.toDateString() === date_str) return `Yesterday ${newDate}`;
    else return newDate;
  };

  useEffect(() => {
    const id = route.params.id;
    loadProfile(id);
    loadPersonalHistory(id);
  }, []);

  const onClickBottomHeader = (_isDetail: boolean) => {
    setIsDetail(_isDetail);
    scroller?.scrollTo();
  };

  const onPressBack = () => navigation.goBack();
  const onPressEdit = () => {
    // TODO
  };
  const onPressMenu = (value: "Delete" | "Share") => {
    if (value === "Delete") {
    } else if (value === "Share") {
    }
    setMenuVisible(false);
  };
  const onPressTag = (tag: string) => navigation.push("Phone", { tag });

  if (!profile || !history) return <Text> Loading...</Text>;

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.header}>
            <View style={styles.header_icons}>
              <Pressable onPress={onPressBack}>
                <FontAwesome
                  style={styles.header_icon}
                  name="angle-left"
                  size={30}
                  color="black"
                />
              </Pressable>
            </View>
            <View style={styles.header_icons}>
              <Pressable onPress={onPressEdit}>
                <FontAwesome
                  style={styles.header_icon}
                  name="edit"
                  size={26}
                  color="black"
                />
              </Pressable>
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Pressable onPress={() => setMenuVisible(true)}>
                    <FontAwesome
                      style={styles.header_icon}
                      name="ellipsis-v"
                      size={26}
                      color="black"
                    />
                  </Pressable>
                }
              >
                <Menu.Item onPress={() => onPressMenu("Share")} title="Share" />
                <Menu.Item
                  onPress={() => onPressMenu("Delete")}
                  title="Delete"
                />
              </Menu>
            </View>
          </View>
          <View style={styles.profile}>
            <Image style={styles.profile_image} source={profile.image} />
            <Text
              style={styles.profile_name}
            >{`${profile.title} ${profile.full_name}`}</Text>
            <View style={styles.profile_tags}>
              {profile.tags.map((tag, idx) => (
                <Pressable key={idx} onPress={() => onPressTag(tag)}>
                  <Tag name={tag} />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
        <View style={styles_bottom.container}>
          <View style={styles_bottom.header}>
            <Pressable onPress={() => onClickBottomHeader(true)}>
              <Text
                style={
                  isDetail
                    ? styles_bottom.header_text_pressed
                    : styles_bottom.header_text
                }
              >
                Details
              </Text>
            </Pressable>
            <Pressable onPress={() => onClickBottomHeader(false)}>
              <Text
                style={
                  !isDetail
                    ? styles_bottom.header_text_pressed
                    : styles_bottom.header_text
                }
              >
                History
              </Text>
            </Pressable>
          </View>

          <ScrollView style={styles_bottom.body} ref={setScroller}>
            {isDetail
              ? profile.contacts.map((props, idx) => (
                  <Contact key={idx} {...props} />
                ))
              : Object.entries(history).map(([date, historyList], idx) => (
                  <View key={idx} style={styles_bottom.box}>
                    <Text style={styles_bottom.date}>
                      {getDateFormat(date)}
                    </Text>
                    {historyList.map((h, idx) => (
                      <History key={idx} history={h} />
                    ))}
                  </View>
                ))}
          </ScrollView>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.grey100,
  },
  top: {
    backgroundColor: "white",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header_icons: {
    flexDirection: "row",
  },
  header_icon: {
    marginHorizontal: 10,
  },
  profile: {
    alignItems: "center",
  },
  profile_image: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  profile_name: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profile_tags: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

const styles_bottom = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 9,
    marginBottom: 10,
  },
  header_text: {
    fontSize: 20,
    color: theme.grey200,
    marginHorizontal: 7,
  },
  header_text_pressed: {
    fontSize: 20,
    color: theme.purplePrimary,
    borderBottomWidth: 2,
    borderBottomColor: theme.purplePrimary,
    marginHorizontal: 7,
  },
  body: {
    flex: 1,
    marginHorizontal: 20,
  },
  box: {
    marginBottom: 14,
  },
  date: {
    fontSize: 13,
    color: theme.grey600,
    alignSelf: "center",
    marginBottom: 10,
  },
});
