import React from "react";

import * as styles from "./AlertDiv.module.css";

interface AlertDivProps {
  color?: string;
  children: JSX.Element;
}

export default function AlertDiv({ color, children }: AlertDivProps) {
  return (
    <div className={styles.alertDiv} data-color={color}>
      {children}
    </div>
  );
}
