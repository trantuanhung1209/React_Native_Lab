import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootParamList = {
  Home: undefined;
  ProductDetails: { id: string };
};

export type TabParamList = {
  Products: undefined;
  Favorites: undefined;
};

export type RootProps<RouteName extends keyof RootParamList> =
  NativeStackScreenProps<RootParamList, RouteName>;

export type TabProps<RouteName extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, RouteName>,
    NativeStackScreenProps<RootParamList>
  >;
