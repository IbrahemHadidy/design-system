'use client';

import { Link, usePathname } from '@/lib/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import type { ComponentProps } from 'react';

interface AuthLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  href: string;
}

function AuthLink({ href, ...props }: AuthLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const currentUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

  const finalHref =
    redirect || href.includes('redirect=')
      ? href
      : `${href}?redirect=${encodeURIComponent(currentUrl)}`;

  return <Link href={finalHref} {...props} />;
}

export { AuthLink, type AuthLinkProps };
