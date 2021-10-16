import { StatusBar } from "expo-status-bar";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { RootStackParamList, SCREENS } from "./src/screens";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Phone"
        screenOptions={{ headerShown: false }}
      >
        {Object.entries(SCREENS).map(([name, props], idx) => (
          <RootStack.Screen
            key={idx}
            name={name as keyof RootStackParamList}
            component={props.component}
            initialParams={props.initParams}
          />
        ))}
      </RootStack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
