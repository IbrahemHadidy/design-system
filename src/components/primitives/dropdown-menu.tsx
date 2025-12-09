'use client';

import { getStrictContext } from '@/components/contexts/get-strict-context';
import {
  Highlight,
  HighlightItem,
  type HighlightItemProps,
  type HighlightProps,
} from '@/components/primitives/effects/highlight';
import { useControlledState } from '@/hooks/use-controlled-state';
import { getDirection } from '@/lib/utils/get-direction';
import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';
import { useLocale } from 'next-intl';
import type { ComponentProps } from 'react';

type DropdownMenuContextType = {
  isOpen: boolean;
  setIsOpen: (o: boolean) => void;
};

const [DropdownMenuProvider, useDropdownMenu] =
  getStrictContext<DropdownMenuContextType>('DropdownMenuContext');

const [DropdownMenuSubProvider, useDropdownMenuSub] =
  getStrictContext<DropdownMenuContextType>('DropdownMenuSubContext');

type DropdownMenuProps = ComponentProps<typeof Root>;

function DropdownMenu(props: DropdownMenuProps) {
  const locale = useLocale();
  const dir = getDirection(locale);

  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });

  return (
    <DropdownMenuProvider value={{ isOpen, setIsOpen }}>
      <Root data-slot="dropdown-menu" {...props} dir={dir} onOpenChange={setIsOpen} />
    </DropdownMenuProvider>
  );
}

type DropdownMenuTriggerProps = ComponentProps<typeof Trigger>;

function DropdownMenuTrigger(props: DropdownMenuTriggerProps) {
  return <Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

type DropdownMenuPortalProps = ComponentProps<typeof Portal>;

function DropdownMenuPortal(props: DropdownMenuPortalProps) {
  return <Portal data-slot="dropdown-menu-portal" {...props} />;
}

type DropdownMenuGroupProps = ComponentProps<typeof Group>;

function DropdownMenuGroup(props: DropdownMenuGroupProps) {
  return <Group data-slot="dropdown-menu-group" {...props} />;
}

type DropdownMenuSubProps = ComponentProps<typeof Sub>;

function DropdownMenuSub(props: DropdownMenuSubProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });

  return (
    <DropdownMenuSubProvider value={{ isOpen, setIsOpen }}>
      <Sub data-slot="dropdown-menu-sub" {...props} onOpenChange={setIsOpen} />
    </DropdownMenuSubProvider>
  );
}

type DropdownMenuRadioGroupProps = ComponentProps<typeof RadioGroup>;

function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps) {
  return <RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

type DropdownMenuSubTriggerProps = Omit<ComponentProps<typeof SubTrigger>, 'asChild'> &
  HTMLMotionProps<'div'>;

function DropdownMenuSubTrigger({ disabled, textValue, ...props }: DropdownMenuSubTriggerProps) {
  return (
    <SubTrigger disabled={disabled} textValue={textValue} asChild>
      <motion.div data-slot="dropdown-menu-sub-trigger" data-disabled={disabled} {...props} />
    </SubTrigger>
  );
}

type DropdownMenuSubContentProps = Omit<
  ComponentProps<typeof SubContent>,
  'forceMount' | 'asChild'
> &
  Omit<ComponentProps<typeof Portal>, 'forceMount'> &
  HTMLMotionProps<'div'>;

function DropdownMenuSubContent({
  loop,
  onEscapeKeyDown,
  onPointerDownOutside,
  onFocusOutside,
  onInteractOutside,
  sideOffset,
  alignOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  arrowPadding,
  sticky,
  hideWhenDetached,
  transition = { duration: 0.2 },
  style,
  container,
  ...props
}: DropdownMenuSubContentProps) {
  const { isOpen } = useDropdownMenuSub();

  return (
    <AnimatePresence>
      {isOpen && (
        <DropdownMenuPortal forceMount container={container}>
          <SubContent
            asChild
            forceMount
            loop={loop}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
            onFocusOutside={onFocusOutside}
            onInteractOutside={onInteractOutside}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            avoidCollisions={avoidCollisions}
            collisionBoundary={collisionBoundary}
            collisionPadding={collisionPadding}
            arrowPadding={arrowPadding}
            sticky={sticky}
            hideWhenDetached={hideWhenDetached}
          >
            <motion.div
              key="dropdown-menu-sub-content"
              data-slot="dropdown-menu-sub-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={transition}
              style={{ willChange: 'opacity, transform', ...style }}
              {...props}
            />
          </SubContent>
        </DropdownMenuPortal>
      )}
    </AnimatePresence>
  );
}

type DropdownMenuHighlightProps = Omit<HighlightProps, 'controlledItems' | 'enabled' | 'hover'> & {
  animateOnHover?: boolean;
};

function DropdownMenuHighlight({
  transition = { type: 'spring', stiffness: 350, damping: 35 },
  animateOnHover = true,
  ...props
}: DropdownMenuHighlightProps) {
  return (
    <Highlight hover controlledItems enabled={animateOnHover} transition={transition} {...props} />
  );
}

type DropdownMenuContentProps = Omit<ComponentProps<typeof Content>, 'forceMount' | 'asChild'> &
  Omit<ComponentProps<typeof Portal>, 'forceMount'> &
  HTMLMotionProps<'div'>;

function DropdownMenuContent({
  loop,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onPointerDownOutside,
  onFocusOutside,
  onInteractOutside,
  side,
  sideOffset,
  align,
  alignOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  arrowPadding,
  sticky,
  hideWhenDetached,
  transition = { duration: 0.2 },
  style,
  container,
  ...props
}: DropdownMenuContentProps) {
  const { isOpen } = useDropdownMenu();

  return (
    <AnimatePresence>
      {isOpen && (
        <DropdownMenuPortal forceMount container={container}>
          <Content
            asChild
            loop={loop}
            onCloseAutoFocus={onCloseAutoFocus}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
            onFocusOutside={onFocusOutside}
            onInteractOutside={onInteractOutside}
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
            avoidCollisions={avoidCollisions}
            collisionBoundary={collisionBoundary}
            collisionPadding={collisionPadding}
            arrowPadding={arrowPadding}
            sticky={sticky}
            hideWhenDetached={hideWhenDetached}
          >
            <motion.div
              key="dropdown-menu-content"
              data-slot="dropdown-menu-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.95,
                transition: { ...transition, delay: 0.3 },
              }}
              transition={transition}
              style={{ willChange: 'opacity, transform', ...style }}
              {...props}
            />
          </Content>
        </DropdownMenuPortal>
      )}
    </AnimatePresence>
  );
}

type DropdownMenuHighlightItemProps = HighlightItemProps;

function DropdownMenuHighlightItem(props: DropdownMenuHighlightItemProps) {
  return <HighlightItem data-slot="dropdown-menu-highlight-item" {...props} />;
}

type DropdownMenuItemProps = Omit<ComponentProps<typeof Item>, 'asChild'> & HTMLMotionProps<'div'>;

function DropdownMenuItem({ disabled, onSelect, textValue, ...props }: DropdownMenuItemProps) {
  return (
    <Item disabled={disabled} onSelect={onSelect} textValue={textValue} asChild>
      <motion.div data-slot="dropdown-menu-item" data-disabled={disabled} {...props} />
    </Item>
  );
}

type DropdownMenuCheckboxItemProps = ComponentProps<typeof CheckboxItem> & HTMLMotionProps<'div'>;

function DropdownMenuCheckboxItem({
  checked,
  onCheckedChange,
  disabled,
  onSelect,
  textValue,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <CheckboxItem
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      onSelect={onSelect}
      textValue={textValue}
      asChild
    >
      <motion.div data-slot="dropdown-menu-checkbox-item" data-disabled={disabled} {...props} />
    </CheckboxItem>
  );
}

type DropdownMenuRadioItemProps = Omit<ComponentProps<typeof RadioItem>, 'asChild'> &
  HTMLMotionProps<'div'>;

function DropdownMenuRadioItem({
  value,
  disabled,
  onSelect,
  textValue,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <RadioItem value={value} disabled={disabled} onSelect={onSelect} textValue={textValue} asChild>
      <motion.div data-slot="dropdown-menu-radio-item" data-disabled={disabled} {...props} />
    </RadioItem>
  );
}

type DropdownMenuLabelProps = ComponentProps<typeof Label>;

function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  return <Label data-slot="dropdown-menu-label" {...props} />;
}

type DropdownMenuSeparatorProps = ComponentProps<typeof Separator>;

function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
  return <Separator data-slot="dropdown-menu-separator" {...props} />;
}

type DropdownMenuShortcutProps = ComponentProps<'span'>;

function DropdownMenuShortcut(props: DropdownMenuShortcutProps) {
  return <span data-slot="dropdown-menu-shortcut" {...props} />;
}

type DropdownMenuItemIndicatorProps = Omit<ComponentProps<typeof ItemIndicator>, 'asChild'> &
  HTMLMotionProps<'div'>;

function DropdownMenuItemIndicator(props: DropdownMenuItemIndicatorProps) {
  return (
    <ItemIndicator data-slot="dropdown-menu-item-indicator" asChild>
      <motion.div {...props} />
    </ItemIndicator>
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuHighlight,
  DropdownMenuHighlightItem,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  useDropdownMenu,
  useDropdownMenuSub,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuContentProps,
  type DropdownMenuContextType,
  type DropdownMenuGroupProps,
  type DropdownMenuHighlightItemProps,
  type DropdownMenuHighlightProps,
  type DropdownMenuItemIndicatorProps,
  type DropdownMenuItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuPortalProps,
  type DropdownMenuProps,
  type DropdownMenuRadioGroupProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuShortcutProps,
  type DropdownMenuSubContentProps,
  type DropdownMenuSubProps,
  type DropdownMenuSubTriggerProps,
  type DropdownMenuTriggerProps,
};
