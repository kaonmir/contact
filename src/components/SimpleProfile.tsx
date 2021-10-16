import React, { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../../color";

type ProfileProps = {
  image: ImageSourcePropType;
  name: string;
  content: string;
  tags: string[];
  onPress: () => void;
};

// TODO: Search
// TODO: If we have long tag, how can we deal with it?

export default function SimpleProfileComp({
  image,
  name,
  content,
  tags,
  onPress,
}: ProfileProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <View style={styles.body}>
          <Text numberOfLines={1} style={styles.body_name}>
            {name}
          </Text>
          <Text numberOfLines={1} style={styles.body_content}>
            {content}
          </Text>
        </View>
        <View style={styles.tags}>
          {tags.slice(0, 2).map((name, idx) => (
            <View style={styles.tag} key={idx}>
              <Text
                numberOfLines={1}
                ellipsizeMode="clip"
                style={styles.tag_text}
              >
                {name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },
  image: {
    width: 40,
    height: 40,
  },
  body: {
    flex: 6,
    marginHorizontal: 13,
    justifyContent: "space-between",
  },
  body_name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  body_content: {
    fontSize: 13,
    color: theme.grey500,
  },
  tags: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  tag: {
    backgroundColor: theme.grey100,
    textAlign: "center",
    paddingVertical: 1,
    paddingHorizontal: 5,
    marginRight: 5,
    borderRadius: 6,
  },
  tag_text: {
    fontSize: 12,
    color: "black",
  },
});
