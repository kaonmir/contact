import React from "react";
import { CallType } from "../../model/@types/Profile";
import { FontAwesome } from "@expo/vector-icons";
import { Image, ImageSourcePropType } from "react-native";

import IncomingCall from "../../assets/icons/incoming_call.png";
import OutgoingCall from "../../assets/icons/outgoing_call.png";
import MissedIncomingCall from "../../assets/icons/missed_incoming_call.png";
import MissedOutgoingCall from "../../assets/icons/missed_outgoing_call.png";
import Email from "../../assets/icons/email.png";

type Props = {
  name: CallType;
  size?: number;
  color?: string;
  style?: object;
};

export function Icon({ name, size = 25, color, style }: Props) {
  var source: ImageSourcePropType;

  if (name === "incoming") source = IncomingCall;
  else if (name === "outgoing") source = OutgoingCall;
  else if (name === "missed_incoming") source = MissedIncomingCall;
  else if (name === "missed_outgoing") source = MissedOutgoingCall;
  // else if (name === "message") image = Email;
  else source = Email;

  return (
    <Image
      source={source}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    />
  );
}
