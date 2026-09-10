"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

type CompactSelectProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  displayValue?: string;
  icon?: ReactNode;
};

export function CompactSelect({
  label,
  value,
  onValueChange,
  options,
  displayValue,
  icon,
}: CompactSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="compact-select" aria-label={label}>
        {icon}
        <Select.Value>{displayValue}</Select.Value>
        <Select.Icon>
          <ChevronDown size={13} aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="compact-select-menu"
          position="popper"
          align="end"
          sideOffset={8}
          collisionPadding={12}
        >
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item
                className="compact-select-option"
                key={option.value}
                value={option.value}
                textValue={option.label}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check size={13} aria-hidden="true" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
