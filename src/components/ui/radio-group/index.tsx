'use client';

import type { ComponentProps } from 'react';
import { RadioGroup as DotRadio, type CustomRadioGroupItemProps } from './radio-group';
import { RadioGroupButton } from './radio-group-button';
import { RadioGroupFill } from './radio-group-fill';
import { RadioGroupMarker } from './radio-group-marker';
import { RadioGroupSwitch } from './radio-group-switch';
import { RadioGroupTab } from './radio-group-tab';

type DotProps = ComponentProps<typeof DotRadio> & { mode?: 'dot' };
type TabProps = ComponentProps<typeof RadioGroupTab> & { mode: 'tab' };
type SwitchProps = ComponentProps<typeof RadioGroupSwitch> & { mode: 'switch' };
type MarkerProps = ComponentProps<typeof RadioGroupMarker> & { mode: 'marker' };
type FillProps = ComponentProps<typeof RadioGroupFill> & { mode: 'fill' };
type ButtonProps = ComponentProps<typeof RadioGroupButton> & { mode: 'button' };

type RadioProps = DotProps | TabProps | SwitchProps | MarkerProps | FillProps | ButtonProps;

export default function RadioGroup(props: RadioProps) {
  const { mode = 'dot', ...rest } = props;

  switch (mode) {
    case 'tab':
      return <RadioGroupTab {...(rest as TabProps)} />;
    case 'switch':
      return <RadioGroupSwitch {...(rest as SwitchProps)} />;
    case 'marker':
      return <RadioGroupMarker {...(rest as MarkerProps)} />;
    case 'fill':
      return <RadioGroupFill {...(rest as FillProps)} />;
    case 'button':
      return <RadioGroupButton {...(rest as ButtonProps)} />;
    case 'dot':
    default:
      return <DotRadio {...(rest as DotProps)} />;
  }
}

export {
  RadioGroupButton,
  DotRadio as RadioGroupDot,
  RadioGroupFill,
  RadioGroupMarker,
  RadioGroupSwitch,
  RadioGroupTab,
  type CustomRadioGroupItemProps,
};
