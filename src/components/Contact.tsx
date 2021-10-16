import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ContactType } from "../../model/@types/Profile";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../../color";

type Props = {
  icon: ContactType;
  name: string;
  content: string;
};

export default function Contact({ icon, name, content }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <FontAwesome
          name={icon === "phone" ? "phone" : "envelope"}
          size={28}
          color={theme.purplePrimary}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  body: {
    marginLeft: 12,
  },
  icon: {
    width: 30,
    alignItems: "center",
  },
  name: {
    fontSize: 11,
    letterSpacing: 0.6,
    color: theme.grey400,
  },
  content: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
