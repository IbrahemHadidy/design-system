'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { PiFile, PiX, PiXCircle } from 'react-icons/pi';
import { cn } from 'tailwind-variants';

interface AttachmentProps {
  type?: 'basic' | 'upload';
  border?: 'none' | 'line' | 'dashed';
  background?: 'none' | 'primary';
  iconBg?: 'default' | 'secondary';
  iconBorder?: 'circular' | 'square';
  closeBtn?: 'default' | 'circle';
  onCancel: () => void;
  title: string;
  size: string;
  uploadPercent?: number;
}

function Attachment({
  type = 'basic',
  border = 'none',
  background = 'none',
  iconBg = 'default',
  iconBorder = 'square',
  closeBtn = 'default',
  onCancel,
  title,
  size,
  uploadPercent,
}: AttachmentProps) {
  const t = useTranslations('Components.FileUpload');
  const isUploading = type === 'upload' && uploadPercent !== undefined && uploadPercent < 100;

  return (
    <motion.article
      layout
      role="group"
      aria-label={t('attachmentLabel', { title })}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className={cn(
        'border-primary flex w-full flex-col justify-between gap-3 rounded-xl p-4',
        border === 'line' && 'border',
        border === 'dashed' && 'border border-dashed',
        background === 'primary' ? 'bg-primary/50' : 'bg-background'
      )}
    >
      <div className="flex w-full items-center justify-between">
        {/* FILE ICON + TEXT */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'p-2',
              iconBg === 'secondary' ? 'bg-secondary' : 'bg-background',
              iconBorder === 'circular' ? 'rounded-full' : 'rounded-sm'
            )}
          >
            <PiFile aria-hidden className="text-primary size-6" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold">{title}</p>
            <p className="text-2xs" aria-label={t('fileSize', { size })}>
              {size}
            </p>
          </div>
        </div>

        {/* CLOSE BUTTON + STATUS */}
        <div className="flex flex-col items-end gap-1">
          <button
            onClick={onCancel}
            aria-label={t('removeAttachment', { title })}
            className="text-primary hover:text-primary/80 focus:ring-primary/40 rounded p-1 focus:ring focus:outline-none"
          >
            {closeBtn === 'circle' ? (
              <PiXCircle aria-hidden className={type === 'basic' ? 'size-6' : 'size-5'} />
            ) : (
              <PiX aria-hidden className={type === 'basic' ? 'size-6' : 'size-5'} />
            )}
          </button>

          {type === 'upload' &&
            (isUploading ? (
              <span className="text-primary text-2xs" aria-live="polite">
                {t('uploading', { percent: uploadPercent })}
              </span>
            ) : (
              <span className="text-success text-2xs" aria-live="polite">
                {t('completed')}
              </span>
            ))}
        </div>
      </div>

      {/* PROGRESS BAR */}
      {type === 'upload' && uploadPercent !== undefined && (
        <div className="bg-background relative h-1 w-full rounded-md">
          <progress
            value={uploadPercent}
            max={100}
            aria-label={t('uploadProgress', { title })}
            className="sr-only"
          />
          <div
            className="bg-primary absolute inset-0 rounded-md transition-all duration-500 ease-in-out"
            style={{ width: `${uploadPercent}%` }}
          />
        </div>
      )}
    </motion.article>
  );
}

interface AttachmentListProps {
  files: File[];
  onCancel: (fileName: string) => void;
  attachmentProps?: Partial<Omit<AttachmentProps, 'onCancel' | 'title' | 'size'>>;
}

function AttachmentList({
  files,
  onCancel,
  attachmentProps = {
    type: 'basic',
    border: 'dashed',
    background: 'primary',
    iconBg: 'secondary',
    iconBorder: 'square',
    closeBtn: 'default',
  },
}: AttachmentListProps) {
  const t = useTranslations('Components.FileUpload');

  return (
    <ul className="space-y-2" role="list" aria-label={t('uploadedAttachments')}>
      <AnimatePresence>
        {files.map((file) => (
          <motion.li
            key={file.name}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Attachment
              {...attachmentProps}
              onCancel={() => onCancel(file.name)}
              title={file.name}
              size={`${(file.size / 1024).toFixed(1)} KB`}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export { Attachment, AttachmentList, type AttachmentListProps, type AttachmentProps };
