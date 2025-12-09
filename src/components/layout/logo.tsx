import type { SVGProps } from 'react';

export const Logo = ({
  variant = 'default',
  ...props
}: SVGProps<SVGSVGElement> & {
  variant?: 'default' | 'outline' | 'outline-no-text';
}) => {
  if (variant === 'default') {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#clip0_original)">
          <path
            d="M18.5 12C22 20, 28 26, 32 32C36 26, 42 20, 45.5 12C48 18, 50 26, 50 32C50 38, 48 46, 45.5 52C42 44, 36 38, 32 32C28 38, 22 44, 18.5 52C16 46, 14 38, 14 32C14 26, 16 18, 18.5 12Z"
            fill="#2A9D8F"
          />
          <path
            d="M32 18C28 24, 24 28, 20 32C24 36, 28 40, 32 46C36 40, 40 36, 44 32C40 28, 36 24, 32 18Z"
            fill="#264653"
            opacity="0.6"
          />
          <path
            d="M32 24C29 27, 27 30, 27 32C27 34, 29 37, 32 40C35 37, 37 34, 37 32C37 30, 35 27, 32 24Z"
            fill="#E9F5E9"
          />
        </g>
        <defs>
          <clipPath id="clip0_original">
            <rect width="64" height="64" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  if (variant === 'outline') {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M18.5 12C22 20, 28 26, 32 32C36 26, 42 20, 45.5 12C48 18, 50 26, 50 32C50 38, 48 46, 45.5 52C42 44, 36 38, 32 32C28 38, 22 44, 18.5 52C16 46, 14 38, 14 32C14 26, 16 18, 18.5 12Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 18C28 24, 24 28, 20 32C24 36, 28 40, 32 46C36 40, 40 36, 44 32C40 28, 36 24, 32 18Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === 'outline-no-text') {
    return (
      <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M28 18C34 30, 44 40, 50 50C56 40, 66 30, 72 18C76 28, 79 40, 79 50C79 60, 76 72, 72 82C66 70, 56 60, 50 50C44 60, 34 70, 28 82C24 72, 21 60, 21 50C21 40, 24 28, 28 18Z"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50 28C44 36, 38 42, 34 50C38 58, 44 64, 50 70C56 64, 62 58, 66 50C62 42, 56 36, 50 28Z"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null;
};
