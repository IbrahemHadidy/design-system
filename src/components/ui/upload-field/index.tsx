'use client';

import type { ReactNode } from 'react';
import { Attachment, AttachmentList } from './attachment';
import {
  ClassicFileUpload,
  ExtendedFileUpload,
  MinimalFileUpload,
  StrictMinimalImageUpload,
  useFileUpload,
} from './upload-field-shared';

type UploadFieldVariant = 'minimal' | 'strict-minimal' | 'extended' | 'classic';

interface BaseUploadFieldProps {
  variant?: UploadFieldVariant;
  type: 'single' | 'multiple';
  supportedFiles: string[];
  onDrop: (acceptedFiles: File[]) => void;
  className?: string;
  activeClassName?: string;
  borderClass?: string;
  backgroundClass?: string;
  dragBackgroundClass?: string;
  maxSize?: string;
  selectedFiles?: ReactNode;
}

interface StrictMinimalProps extends BaseUploadFieldProps {
  variant: 'strict-minimal';
  ratio: string;
  outerBorderClass?: string;
}

interface ExtendedProps extends BaseUploadFieldProps {
  variant: 'extended';
  buttonType?: 'outline' | 'underline';
}

type UploadFieldProps = BaseUploadFieldProps | StrictMinimalProps | ExtendedProps;

function UploadField(props: UploadFieldProps) {
  const { variant = 'minimal', ...rest } = props as BaseUploadFieldProps;

  switch (variant) {
    case 'strict-minimal':
      return (
        <StrictMinimalImageUpload
          {...(rest as StrictMinimalProps)}
          ratio={(props as StrictMinimalProps).ratio}
          outerBorderClass={(props as StrictMinimalProps).outerBorderClass ?? 'border-border'}
        />
      );
    case 'extended':
      return (
        <ExtendedFileUpload
          {...(rest as ExtendedProps)}
          buttonType={(props as ExtendedProps).buttonType ?? 'outline'}
        />
      );
    case 'classic':
      return <ClassicFileUpload {...rest} />;
    case 'minimal':
    default:
      return <MinimalFileUpload {...rest} />;
  }
}

export {
  Attachment,
  AttachmentList,
  ClassicFileUpload,
  ExtendedFileUpload,
  MinimalFileUpload,
  StrictMinimalImageUpload,
  UploadField,
  useFileUpload,
  type BaseUploadFieldProps,
  type ExtendedProps,
  type StrictMinimalProps,
  type UploadFieldProps,
  type UploadFieldVariant,
};
