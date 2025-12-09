'use client';

import {
  TabsContent,
  TabsContents,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  Tabs as TabsPrimitive,
  TabsTrigger,
  type TabsProps as TabsPrimitiveProps,
} from '@/components/primitives/tabs';
import type { ReactNode } from 'react';

type TabType = {
  label: ReactNode;
  value: string;
  content: ReactNode;
};

interface TabsProps extends Omit<TabsPrimitiveProps, 'children'> {
  tabs: TabType[];
}

function Tabs({ tabs, ...props }: TabsProps) {
  return (
    <TabsPrimitive {...props}>
      <TabsHighlight className="bg-background absolute inset-0 z-0 rounded-lg">
        <TabsList className="bg-accent relative inline-flex h-10 w-full rounded-t-lg p-1">
          {tabs.map((tab) => (
            <TabsHighlightItem
              key={tab.value}
              value={tab.value}
              className="flex flex-1 items-center justify-center rounded"
            >
              <TabsTrigger className="cursor-pointer" value={tab.value}>
                {tab.label}
              </TabsTrigger>
            </TabsHighlightItem>
          ))}
        </TabsList>
      </TabsHighlight>

      <TabsContents className="bg-background border-accent rounded-b-lg border border-t-0 p-3">
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="space-y-4">
            {tab.content}
          </TabsContent>
        ))}
      </TabsContents>
    </TabsPrimitive>
  );
}

export { Tabs, type TabsProps, type TabType };
