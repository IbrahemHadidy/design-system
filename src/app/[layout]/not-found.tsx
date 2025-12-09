import { Button } from '@/components/ui/buttons/button';
import { Link } from '@/lib/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { PiXCircle } from 'react-icons/pi';
// import Image from 'next/image';

// import notFound from '@/assets/images/not-found.webp';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {/* <Image src={notFound} width={179} height={134} alt="not-found" className="max-md:-scale-50" /> */}
      <PiXCircle className="text-destructive size-45" />
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-xlp font-bold">{t('title')}</h1>
        <p className="text-base font-medium">{t('description')}</p>
        <Button asChild size="lg">
          <Link href="/">{t('backHome')}</Link>
        </Button>
      </div>
    </div>
  );
}
