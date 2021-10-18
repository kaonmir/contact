import React from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../../color";

type Props = {
  name: string;
};

export default function Tag({ name }: Props) {
  return <Text style={styles.container}>{name}</Text>;
}

const styles = StyleSheet.create({
  container: {
    color: theme.grey800,
    fontSize: 13,
    backgroundColor: theme.grey100,
    paddingVertical: 0.3,
    paddingHorizontal: 4,
    marginLeft: 5,
    marginVertical: 3,
    borderRadius: 5,
  },
});
