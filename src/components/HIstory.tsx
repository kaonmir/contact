import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../color";
import { PersonalHistory } from "../../model/@types/Profile";
import { Icon } from "./Icon";

type Props = {
  history: PersonalHistory;
};

export default function History({ history }: Props) {
  const getTwoDigits = (time: number): string =>
    time < 10 ? `0${time}` : `${time}`;

  const getTimeFormat = (date: string): string => {
    const time = date.split(" ")[1];
    const [hh, mm, _] = time.split(":").map((v) => parseInt(v));

    const isAM = hh <= 12;
    const newHH = hh > 12 ? hh - 12 : hh;

    return `${isAM ? "AM" : "PM"} ${getTwoDigits(newHH)}:${getTwoDigits(mm)}`;
  };

  const getCallTimeFormat = (time: number) => {
    const hh = Math.floor(time / (60 * 60));
    const mm = Math.floor(time / 60) - hh * 60;
    const ss = time - hh * 60 * 60 - mm * 60;

    return [hh, mm, ss].map(getTwoDigits).join(":");
  };

  const isCalling =
    history.call_type === "incoming" || history.call_type === "outgoing";
  const isMessage =
    history.call_type === "message_incoming" ||
    history.call_type === "message_outgoing";

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Icon name={history.call_type} style={styles.icon} />
        <View style={styles.body}>
          <Text style={styles.time}>{getTimeFormat(history.date)}</Text>
          <Text style={styles.content}>{history.content}</Text>
        </View>
      </View>
      {isCalling ? (
        <Text style={styles.call_time}>
          {getCallTimeFormat(history.call_time!)}
        </Text>
      ) : null}
      {isMessage ? (
        <View style={styles.message}>
          <Text numberOfLines={2} style={styles.message_content}>
            {history.message}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  body: {},
  time: {
    fontSize: 16,
    // fontWeight: "bold",
  },
  content: {
    fontSize: 12,
    color: theme.grey400,
  },
  call_time: {
    fontSize: 12,
    color: theme.grey500,
  },
  message: {
    flex: 1,
    backgroundColor: theme.grey200,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  message_content: {
    fontSize: 11,
  },
});
