import preview from '#storybook/preview';
import { Button } from '@/components/ui/buttons/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, type TabType } from '@/components/ui/tabs';

const tabsSample: TabType[] = [
  {
    label: 'Account',
    value: 'account',
    content: (
      <Card className="space-y-2 p-4">
        <p>Account settings go here.</p>
        <Input className="w-full border px-2 py-1" placeholder="Name" />
        <Input className="w-full border px-2 py-1" placeholder="Email" />
        <Button>Save</Button>
      </Card>
    ),
  },
  {
    label: 'Password',
    value: 'password',
    content: (
      <Card className="space-y-2 p-4">
        <p>Password control panel. This tab is taller.</p>
        <Input className="w-full border px-2 py-1" placeholder="Current password" />
        <Input className="w-full border px-2 py-1" placeholder="New password" />
        <Input className="w-full border px-2 py-1" placeholder="Confirm new password" />
        <Button>Change password</Button>
        <p className="text-muted-foreground mt-2 text-sm">
          Changing your password will log you out of all devices.
        </p>
      </Card>
    ),
  },
  {
    label: 'Notifications',
    value: 'notifications',
    content: (
      <Card className="p-4">
        <p>Notification settings. Short content to test smaller height.</p>
        <Label className="mt-2 flex items-center gap-2">
          <Checkbox /> Email notifications
        </Label>
      </Card>
    ),
  },
];

const meta = preview.meta({
  title: 'Components/Tabs',
  component: Tabs,
});

export const Playground = meta.story({
  args: {
    tabs: tabsSample,
    defaultValue: 'account',
    className: 'w-[400px]',
  },
});
