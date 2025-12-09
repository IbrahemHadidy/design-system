'use client';

import { AnimateIcon } from '@/components/primitives/icon';
import { ScrollArea } from '@/components/primitives/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from '@/components/primitives/sheet';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@/components/primitives/tooltip';
import {
  ViewTransitionButton,
  ViewTransitionProvider,
  useViewTransition,
} from '@/components/primitives/view-transition-button';
import { useTheme } from '@/components/providers/theme-provider';
import { Button } from '@/components/ui/buttons/button';
import { Paintbrush } from '@/components/ui/icons/paint-brush';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { PiMonitor, PiMoon, PiSun, PiX } from 'react-icons/pi';
import { cn } from 'tailwind-variants';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeSwatchprops {
  themeClass: string;
  selected: boolean;
  onSelect: () => void;
  name: string;
  mode: ThemeMode;
}

interface ModeButtonProps {
  modeValue: ThemeMode;
  currentMode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  isSystemDark: boolean;
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
}

interface ThemeSheetInnerProps {
  colorTheme: string;
  setColorTheme: (theme: string) => void;
  availableThemes: string[];
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  isSystemDark: boolean;
  trigger: ReactNode;
}

function ThemeSwatch({ themeClass, selected, onSelect, name, mode }: ThemeSwatchprops) {
  const isDark =
    mode === 'dark' ||
    (mode === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const forced = `${isDark ? 'dark' : 'light'} ${themeClass}`;

  return (
    <div className={cn(forced, 'flex flex-col items-center gap-1')}>
      <ViewTransitionButton
        type="button"
        aria-pressed={selected}
        onClick={onSelect}
        preset="ripple"
        disableAnimateOld
        className={cn(
          'group relative flex flex-col items-center gap-2 transition',
          'hover:ring-primary/70 cursor-pointer border border-transparent hover:shadow-md hover:ring-2',
          'focus-visible:ring-primary/70 focus:outline-none focus-visible:ring-2',
          selected && 'ring-primary shadow-md ring-2'
        )}
        style={{
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          className="flex size-12 items-center justify-center overflow-hidden"
          aria-hidden
          style={{
            borderRadius: 'var(--radius)',
            backgroundColor: 'var(--background)',
          }}
        >
          <div
            className="size-8 transition"
            style={{
              borderRadius: 'var(--radius)',
              background: 'linear-gradient(to bottom right, var(--primary), var(--accent))',
            }}
          />
        </div>

        {/* Checkmark */}
        <div
          className={cn(
            'text-2xs absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full transition-opacity',
            selected
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted-foreground text-muted opacity-0 group-hover:opacity-80'
          )}
        >
          ✓
        </div>
      </ViewTransitionButton>

      <span className="text-muted-foreground text-center text-xs select-none">{name}</span>
    </div>
  );
}

function ModeButton({
  modeValue,
  currentMode,
  setMode,
  isSystemDark,
  tooltipSide = 'top',
}: ModeButtonProps) {
  const t = useTranslations('Components.ThemeSheet');
  const selected = currentMode === modeValue;
  const Icon = modeValue === 'light' ? PiSun : modeValue === 'dark' ? PiMoon : PiMonitor;

  // tooltip label with translation
  const tooltipLabel =
    modeValue === 'system'
      ? t('systemMode', { mode: isSystemDark ? t('dark') : t('light') })
      : t(modeValue); // 'light' | 'dark'

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <ViewTransitionButton
            type="button"
            aria-label={
              selected
                ? t('selectedMode', { mode: t(modeValue) })
                : t('unselectedMode', { mode: t(modeValue) })
            }
            role="radio"
            preset="ripple"
            disableAnimateOld
            onClick={() => setMode(modeValue)}
            className={cn(
              'group relative flex size-12 items-center justify-center rounded-full transition-all',
              'hover:ring-primary/70 focus-visible:ring-primary/70 cursor-pointer hover:shadow-md hover:ring-2 focus:outline-none focus-visible:ring-2',
              selected
                ? 'ring-primary bg-surface border-primary shadow-md ring-2'
                : 'bg-background border-border'
            )}
          >
            <Icon className="size-8" />

            <div
              className={cn(
                'absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full transition-opacity',
                selected
                  ? 'bg-primary text-primary-foreground opacity-100'
                  : 'bg-muted-foreground text-muted opacity-0 group-hover:opacity-80'
              )}
            >
              ✓
            </div>
          </ViewTransitionButton>
        </span>
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent
          side={tooltipSide}
          sideOffset={6}
          align="center"
          className="bg-background text-foreground z-50 rounded px-2 py-1 text-sm shadow-md"
        >
          {tooltipLabel}
          <TooltipArrow className="text-background fill-current" />
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}

function ThemeSheetInner({
  colorTheme,
  setColorTheme,
  availableThemes,
  mode,
  setMode,
  isSystemDark,
  trigger,
}: ThemeSheetInnerProps) {
  const t = useTranslations('Components.ThemeSheet');
  const { isAnimating } = useViewTransition();

  const pretty = (name: string) =>
    name
      .replace(/^theme-/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button
            className="size-12 shadow-lg"
            radius="full"
            variant="default"
            size="icon"
            aria-label={t('openAppearance')}
          >
            <AnimateIcon animateOnHover className="flex size-12 items-center justify-center">
              <Paintbrush className="size-6" />
            </AnimateIcon>
          </Button>
        )}
      </SheetTrigger>

      <SheetPortal>
        <SheetOverlay className="data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut fixed inset-0 bg-black/50 backdrop-blur-xs" />

        <SheetContent
          onPointerDownOutside={isAnimating ? (e) => e.preventDefault() : undefined}
          onInteractOutside={isAnimating ? (e) => e.preventDefault() : undefined}
          onFocusOutside={isAnimating ? (e) => e.preventDefault() : undefined}
          className="bg-background flex max-h-screen w-full max-w-96 flex-col p-4"
        >
          <SheetHeader className="mt-2 flex flex-col gap-1">
            <div className="flex w-full items-center justify-between px-1">
              <SheetTitle>{t('appearance')}</SheetTitle>
              <SheetClose asChild>
                <Button
                  aria-label={t('close')}
                  variant="ghost"
                  radius="full"
                  size="icon"
                  className="size-8"
                >
                  <PiX className="size-6" />
                </Button>
              </SheetClose>
            </div>
            <SheetDescription className="sr-only">{t('chooseThemeAndMode')}</SheetDescription>
          </SheetHeader>

          {/* Main content flex container */}
          <div className="mt-6 flex flex-1 flex-col gap-6 overflow-hidden">
            {/* Mode Selector */}
            <section className="space-y-3 px-1">
              <h3 className="text-sm font-medium">{t('themeMode')}</h3>
              <p className="sr-only">{t('chooseLightDarkSystem')}</p>

              <div className="flex items-center gap-2">
                {(['light', 'dark', 'system'] as const).map((m) => (
                  <ModeButton
                    key={m}
                    modeValue={m}
                    currentMode={mode}
                    setMode={setMode}
                    isSystemDark={isSystemDark}
                  />
                ))}
              </div>

              <div className="sr-only">
                {t('currentMode')}: {mode}{' '}
                {mode === 'system' ? `(${isSystemDark ? t('dark') : t('light')})` : ''}
              </div>
            </section>

            {/* Color Themes - fills remaining space */}
            <section className="flex flex-1 flex-col space-y-3 overflow-hidden">
              <h3 className="text-sm font-medium">{t('colorThemes')}</h3>
              <p className="sr-only">{t('chooseAccentPalette')}</p>

              <ScrollArea className="h-[calc(100%-(var(--spacing)*8))] rounded-md border">
                <div className="grid grid-cols-3 gap-3 p-3 sm:grid-cols-4">
                  {availableThemes.map((tName) => (
                    <ThemeSwatch
                      key={tName}
                      themeClass={tName}
                      name={pretty(tName)}
                      selected={tName === colorTheme}
                      onSelect={() => setColorTheme(tName)}
                      mode={mode}
                    />
                  ))}
                </div>
              </ScrollArea>

              <div className="sr-only">
                {t('activeTheme')}: {pretty(colorTheme)}
              </div>
            </section>
          </div>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
}

function ThemeSheet({ trigger }: { trigger?: ReactNode }) {
  const { colorTheme, setColorTheme, availableThemes, mode, setMode, isSystemDark } = useTheme();

  return (
    <ViewTransitionProvider>
      <ThemeSheetInner
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
        availableThemes={availableThemes}
        mode={mode}
        setMode={setMode}
        isSystemDark={isSystemDark}
        trigger={trigger}
      />
    </ViewTransitionProvider>
  );
}

export {
  ModeButton,
  ThemeSheet,
  ThemeSwatch,
  type ModeButtonProps,
  type ThemeMode,
  type ThemeSheetInnerProps,
  type ThemeSwatchprops,
};
