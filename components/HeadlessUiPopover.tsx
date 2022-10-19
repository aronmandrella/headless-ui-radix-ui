import React, { useContext, useMemo, useState } from "react";
import { Popover as HPopover } from "@headlessui/react";
import { usePopper } from "react-popper";

import styles from "./_Popover.module.scss";

type PlacementSide = "left" | "right" | "top" | "bottom";
type PlacementAlign = "start" | "end";

const PopoverContext = React.createContext<{
  setReferenceElement: (el: HTMLElement | null) => void;
  setPopperElement: (el: HTMLElement | null) => void;
  popperAttributes: Record<string, string>;
  popperStyles: React.CSSProperties;
} | null>(null);

function PopoverRoot({
  side,
  align,
  children,
}: {
  side: PlacementSide;
  align: PlacementAlign;
  children: React.ReactNode;
}) {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: `${side}-${align}`,
    modifiers: [
      {
        name: "offset",
        options: { offset: [0, 10] },
      },
    ],
  });

  const context = useMemo(() => {
    return {
      setReferenceElement,
      setPopperElement,
      popperAttributes: attributes.popper ?? {},
      popperStyles: styles.popper,
    };
  }, [setReferenceElement, setPopperElement, attributes.popper, styles.popper]);

  return (
    <PopoverContext.Provider value={context}>
      <HPopover as={React.Fragment}>{children}</HPopover>
    </PopoverContext.Provider>
  );
}

function PopoverButton<As extends React.ElementType<any> = "button">(
  /* This typing should be improved (works nice outside, but in function resolves to any) */
  props: { as: As } & React.ComponentProps<As>
) {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error(`Not within <PopoverRoot> component.`);
  }

  const { as, children } = props;
  const { setReferenceElement } = context;

  return (
    <HPopover.Button as={as} ref={setReferenceElement} {...props}>
      {children}
    </HPopover.Button>
  );
}

function PopoverPanel({ children }: { children: React.ReactNode }) {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error(`Not within <PopoverRoot> component.`);
  }

  const { setPopperElement, popperStyles, popperAttributes } = context;

  return (
    <HPopover.Panel
      ref={setPopperElement}
      className={styles.panel}
      style={popperStyles}
      {...popperAttributes}
    >
      {children}
    </HPopover.Panel>
  );
}

export const Popover = Object.assign(PopoverRoot, {
  Button: PopoverButton,
  Panel: PopoverPanel,
});
