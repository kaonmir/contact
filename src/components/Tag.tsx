import React from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../../color";

type Props = {
  name: string;
  bgcolor?: string;
};

export default function Tag({ name, bgcolor }: Props) {
  return (
    <Text
      style={{
        backgroundColor: bgcolor || theme.grey100,
        ...styles.container,
      }}
    >
      {name}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    color: theme.grey800,
    fontSize: 13,
    paddingVertical: 0.3,
    paddingHorizontal: 4,
    marginLeft: 5,
    marginVertical: 3,
    borderRadius: 5,
  },
});
