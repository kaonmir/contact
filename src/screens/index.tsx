import React from "react";
import PhoneScreen from "./PhoneScreen";
import ProfileScreen from "./ProfileScreen";

import * as dummy from "../../model/dummy";

// TODO: paramlist와 initparam 간의 type을 동기화하려고 하는데 잘 안된다.
// TODO: Stack.Screen을 참고해도 React Component 형식으로 하면 되는데 또 function 형식으로 하면 안된다.

type ParamList = RootStackParamList;
type RouteName = keyof ParamList;

type Screen = {
  component: React.ComponentType<any>;
  initParams?: Partial<ParamList[RouteName]>;
};

export const SCREENS: Record<RouteName, Screen> = {
  Phone: {
    component: PhoneScreen,
  },
  Profile: {
    component: ProfileScreen,
    initParams: {
      id: 0,
    },
  },
};

export type RootStackParamList = {
  Phone: undefined;
  Profile: {
    id: number;
  };
};
