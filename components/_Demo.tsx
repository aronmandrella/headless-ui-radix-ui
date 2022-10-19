import React from "react";
import { Popover as HeadlessUiPopover } from "./HeadlessUiPopover";
import { Popover as RadixUiPopover } from "./RadixUiPopover";

const ButtonVariants = {
  primary: "px-6 py-2 m-2",
};

interface ButtonProps {
  className?: string;
  variant: keyof typeof ButtonVariants;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, ...rest }, ref) => {
    return (
      <button
        className={[ButtonVariants[variant], className ?? ""].join(" ")}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

function Demo() {
  const contentJsx = (
    <div className="flex flex-col gap-1">
      <a href="/analytics">Analytics</a>
      <a href="/engagement">Engagement</a>
      <a href="/security">Security</a>
      <a href="/integrations">Integrations</a>
    </div>
  );

  return (
    <div className="flex flex-col gap-2" style={{ width: 200 }}>
      <HeadlessUiPopover side="right" align="start">
        <HeadlessUiPopover.Button as={Button} variant="primary">
          Click me
        </HeadlessUiPopover.Button>
        <HeadlessUiPopover.Panel>{contentJsx}</HeadlessUiPopover.Panel>
      </HeadlessUiPopover>

      <RadixUiPopover side="right" align="start" content={contentJsx}>
        <Button variant="primary">Click me</Button>
      </RadixUiPopover>
    </div>
  );
}

export default Demo;
