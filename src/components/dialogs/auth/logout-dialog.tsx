'use client';

import { Button } from '@/components/ui/buttons/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
// import { useLogout } from '@/hooks/actions/use-logout';
import { useTranslations } from 'next-intl';

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {
  const t = useTranslations('Layout.Header');
  // const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md!">
        <DialogHeader>
          <DialogTitle>{t('logout')}</DialogTitle>
          <DialogDescription>{t('logoutDescription')}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            size="md"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            {t('cancel')}
          </Button>
          <Button
            variant="destructive"
            size="md"
            className="flex-1"
            // onClick={() => handleLogout()}
            // disabled={isLoggingOut}
          >
            {t('logout')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
