import React from "react";
import { CommonComponentProps } from "./common";
import { Tooltip, PopperBoundary, PopoverPosition } from "@blueprintjs/core";
import { GLOBAL_STYLE_TOOLTIP_CLASSNAME } from "globalStyles/tooltip";
import { Modifiers } from "popper.js";
import { noop } from "lodash";

type Variant = "dark" | "light";

export type TooltipProps = CommonComponentProps & {
  content: JSX.Element | string;
  disabled?: boolean;
  position?: PopoverPosition;
  children: JSX.Element | React.ReactNode;
  variant?: Variant;
  maxWidth?: string;
  boundary?: PopperBoundary;
  minWidth?: string;
  openOnTargetFocus?: boolean;
  autoFocus?: boolean;
  hoverOpenDelay?: number;
  minimal?: boolean;
  modifiers?: Modifiers;
  isOpen?: boolean;
  onOpening?: typeof noop;
  popoverClassName?: string;
  donotUsePortal?: boolean;
  transitionDuration?: number;
};

const portalContainer = document.getElementById("tooltip-root");

function TooltipComponent(props: TooltipProps) {
  return (
    <Tooltip
      autoFocus={props.autoFocus}
      boundary={props.boundary || "scrollParent"}
      className={props.className}
      content={props.content}
      disabled={props.disabled}
      hoverOpenDelay={props.hoverOpenDelay}
      isOpen={props.isOpen}
      minimal={props.minimal}
      modifiers={{
        preventOverflow: { enabled: false },
        ...props.modifiers,
      }}
      onOpening={props.onOpening}
      openOnTargetFocus={props.openOnTargetFocus}
      popoverClassName={`${GLOBAL_STYLE_TOOLTIP_CLASSNAME} ${props.popoverClassName ??
        ""}`}
      portalContainer={portalContainer as HTMLDivElement}
      position={props.position}
      transitionDuration={props.transitionDuration || 0}
      usePortal={!props.donotUsePortal}
    >
      {props.children}
    </Tooltip>
  );
}

TooltipComponent.defaultProps = {
  position: PopoverPosition.TOP,
  variant: "dark",
};

export default TooltipComponent;
