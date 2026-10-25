declare module "@react-navigation/native" {
  import type { ReactElement, ReactNode } from "react";
  import type { CompositeScreenProps as CoreCompositeScreenProps } from "@react-navigation/core";

  export function NavigationContainer(props: {
    children?: ReactNode;
  }): ReactElement | null;
  export type CompositeScreenProps<A, B> = CoreCompositeScreenProps<A, B>;
}
