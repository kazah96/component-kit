import * as React from "react";

export interface IProps {
  notSelectByDefault: boolean;
  delay: number;
  children:  React.ReactNode | React.ReactChildren[];
  onSelectedItemChanged(item: any): void;
}

export interface IState {
  selectedItemId?: number;
}
