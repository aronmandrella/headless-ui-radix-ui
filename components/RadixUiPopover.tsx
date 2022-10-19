import React from "react";
import * as RPopover from "@radix-ui/react-popover";

import styles from "./_Popover.module.scss";

type PlacementSide = "left" | "right" | "top" | "bottom";
type PlacementAlign = "start" | "end";

export function Popover({
  side,
  align,
  content,
  children,
}: {
  side: PlacementSide;
  align: PlacementAlign;
  content: React.ReactNode;
  children: React.ReactElement;
}) {
  return (
    <RPopover.Root>
      <RPopover.Anchor asChild>
        <RPopover.Trigger asChild>{children}</RPopover.Trigger>
      </RPopover.Anchor>

      <RPopover.Portal>
        <RPopover.Content
          side={side}
          align={align}
          sideOffset={10}
          className={styles.panel}
        >
          {content}
        </RPopover.Content>
      </RPopover.Portal>
    </RPopover.Root>
  );
}
