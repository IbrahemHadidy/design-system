'use client';

import { Button } from '@/components/ui/buttons/button';
import { ClockUploadIcon, CloudUploadIcon } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { motion } from 'motion/react';
import { useCallback, useState, type ReactNode } from 'react';
import { useDropzone } from 'react-dropzone';
import { LuUpload } from 'react-icons/lu';
import { cn } from 'tailwind-variants';

interface DropAreaProps {
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

function MinimalFileUpload({
  type,
  supportedFiles,
  onDrop,
  className,
  activeClassName,
  borderClass = 'border-dashed border-primary',
  backgroundClass = 'bg-background',
  dragBackgroundClass = 'bg-primary/5',
  maxSize,
  selectedFiles,
}: DropAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragging(false);
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: handleDrop,
    accept: supportedFiles.reduce(
      (acc, ext) => {
        switch (ext) {
          case '.jpg':
            acc['image/jpeg'] = [];
            break;
          case '.png':
            acc['image/png'] = [];
            break;
          case '.svg':
            acc['image/svg+xml'] = [];
            break;
          case '.zip':
            acc['application/zip'] = [];
            break;
        }
        return acc;
      },
      {} as Record<string, string[]>
    ),
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    multiple: type === 'multiple',
    noClick: true,
  });

  return (
    <div className={cn('flex w-full flex-col gap-2 transition-all', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col items-center justify-center gap-3 transition-colors',
          isDragging ? dragBackgroundClass + ' scale-105' : backgroundClass,
          isDragging && activeClassName
        )}
      >
        <input {...getInputProps()} hidden />
        <div
          className={cn(
            'border-primary flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed p-6',
            isDragging && 'bg-primary/50',
            borderClass
          )}
        >
          {isDragging ? (
            <>
              <CloudUploadIcon className="text-primary size-10 animate-bounce" />
              <div className="flex flex-col gap-1">
                <span className="text-primary text-center text-xs font-medium tracking-wide transition-colors duration-200">
                  Drop your files here
                </span>
                <span className="text-muted-foreground text-xs">
                  Max {maxSize} files are allowed
                </span>
              </div>
            </>
          ) : (
            <>
              <CloudUploadIcon className="text-primary size-9" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium">
                  Drag your file(s) or{' '}
                  <button onClick={open} className="text-primary cursor-pointer">
                    browse
                  </button>
                </span>
                <span className="text-muted-foreground text-xs">
                  Max {maxSize} files are allowed
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <span className="text-muted-foreground text-xs">Supported: {supportedFiles.join(', ')}</span>
      <motion.div layout className="flex flex-col gap-2">
        {selectedFiles}
      </motion.div>
    </div>
  );
}

function StrictMinimalImageUpload({
  type,
  supportedFiles,
  onDrop,
  className,
  activeClassName,
  borderClass = 'border-dashed border-primary',
  outerBorderClass = 'border-border',
  backgroundClass = 'bg-background',
  dragBackgroundClass = 'bg-primary/5',
  maxSize,
  ratio,
  selectedFiles,
}: DropAreaProps & { ratio: string; outerBorderClass: string }) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center gap-3 rounded-3xl border p-6',
        outerBorderClass
      )}
    >
      <span>
        Upload your store image with a <span>required ratio of {ratio}.</span> Use the crop tool to
        adjust your image before uploading.
      </span>
      <MinimalFileUpload
        type={type}
        supportedFiles={supportedFiles}
        onDrop={onDrop}
        className={className}
        activeClassName={activeClassName}
        borderClass={borderClass}
        backgroundClass={backgroundClass}
        dragBackgroundClass={dragBackgroundClass}
        maxSize={maxSize}
        selectedFiles={selectedFiles}
      />
    </div>
  );
}

function ExtendedFileUpload({
  type,
  supportedFiles,
  onDrop,
  className,
  activeClassName,
  borderClass = 'border-dashed border-foreground',
  backgroundClass = 'bg-background',
  dragBackgroundClass = 'bg-primary/5',
  buttonType = 'outline',
  maxSize,
  selectedFiles,
}: DropAreaProps & { buttonType?: 'outline' | 'underline' }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragging(false);
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: handleDrop,
    accept: supportedFiles.reduce(
      (acc, ext) => {
        switch (ext) {
          case '.jpg':
            acc['image/jpeg'] = [];
            break;
          case '.png':
            acc['image/png'] = [];
            break;
          case '.svg':
            acc['image/svg+xml'] = [];
            break;
          case '.zip':
            acc['application/zip'] = [];
            break;
        }
        return acc;
      },
      {} as Record<string, string[]>
    ),
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    multiple: type === 'multiple',
    noClick: true,
  });

  return (
    <div
      className={cn(
        'border-border flex flex-col gap-4 rounded-3xl border p-6 transition-all',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="border-border rounded-full border p-4">
          <ClockUploadIcon className="text-foreground size-6" />
        </div>
        <div className="flex flex-col justify-center gap-0.5">
          <span className="text-sm font-medium">Upload files</span>
          <span className="text-muted-foreground text-xs">
            Select and upload the files of your choice
          </span>
        </div>
      </div>
      <Separator />
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col items-center justify-center gap-3 transition-colors',
          isDragging ? dragBackgroundClass + ' scale-105' : backgroundClass,
          isDragging && activeClassName
        )}
      >
        <input {...getInputProps()} hidden />

        <div
          className={cn(
            'border-primary mt-1 flex w-full flex-col items-center gap-5.5 rounded-2xl border border-dashed p-7',
            isDragging && 'bg-primary/50',
            borderClass
          )}
        >
          {isDragging ? (
            <div className="flex w-full flex-col items-center justify-center gap-3">
              <ClockUploadIcon className="text-foreground size-10 animate-bounce" />
              <span className="text-foreground text-center text-sm font-medium tracking-wide transition-colors duration-200">
                Choose a file or drag & drop it here
              </span>
              <span className="text-muted-foreground text-xs">Max {maxSize} files are allowed</span>
            </div>
          ) : (
            <>
              <div className="flex w-full flex-col items-center justify-center gap-3">
                <ClockUploadIcon className="text-foreground size-10" />
                <span className="text-foreground text-center text-sm font-medium tracking-wide transition-colors duration-200">
                  Choose a file or drag & drop it here
                </span>
                <span className="text-muted-foreground text-xs">
                  Max {maxSize} files are allowed
                </span>
              </div>
              {buttonType === 'outline' ? (
                <Button onClick={open} variant="outline" className="px-8 py-2.5 text-xs">
                  Browse File
                </Button>
              ) : (
                <Button onClick={open} variant="text" className="underline">
                  Browse File
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      <motion.div layout className="flex flex-col gap-2">
        {selectedFiles}
      </motion.div>
    </div>
  );
}

function ClassicFileUpload({
  type,
  supportedFiles,
  onDrop,
  className,
  activeClassName,
  borderClass = 'border-dashed border-border',
  backgroundClass = 'bg-background',
  dragBackgroundClass = 'bg-primary/5',
  maxSize,
  selectedFiles,
}: DropAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragging(false);
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: handleDrop,
    accept: supportedFiles.reduce(
      (acc, ext) => {
        switch (ext) {
          case '.jpg':
            acc['image/jpeg'] = [];
            break;
          case '.png':
            acc['image/png'] = [];
            break;
          case '.svg':
            acc['image/svg+xml'] = [];
            break;
          case '.zip':
            acc['application/zip'] = [];
            break;
        }
        return acc;
      },
      {} as Record<string, string[]>
    ),
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    multiple: type === 'multiple',
    noClick: true,
  });

  return (
    <div className={cn('flex w-full flex-col gap-4 transition-all', className)}>
      <h2 className="text-foreground text-base font-semibold">Attachment</h2>
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col items-center justify-center gap-3 transition-colors',
          isDragging ? dragBackgroundClass + ' scale-105' : backgroundClass,
          isDragging && activeClassName
        )}
      >
        <input {...getInputProps()} hidden />
        <div
          className={cn(
            'border-primary flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-10.5',
            isDragging && 'bg-primary/50',
            borderClass
          )}
        >
          {isDragging ? (
            <>
              <LuUpload className="text-primary size-10 animate-bounce" />
              <div className="flex flex-col gap-1">
                <span className="text-primary text-center text-xs font-medium tracking-wide transition-colors duration-200">
                  Drop your files here
                </span>
                <span className="text-muted-foreground text-xs">
                  Max {maxSize} files are allowed
                </span>
              </div>
            </>
          ) : (
            <>
              <LuUpload className="text-primary size-6" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium">
                  Drag your file(s) or{' '}
                  <button onClick={open} className="text-primary cursor-pointer">
                    browse
                  </button>
                </span>
                <span className="text-muted-foreground text-xs">Max size: {maxSize}</span>
              </div>
            </>
          )}
        </div>
      </div>
      <motion.div layout className="flex w-full flex-col gap-2 transition-all duration-300">
        {selectedFiles}
      </motion.div>
    </div>
  );
}

const useFileUpload = (type: 'single' | 'multiple' = 'multiple') => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => {
      if (type === 'single') {
        return acceptedFiles.slice(0, 1);
      }
      const newFiles = acceptedFiles.filter((file) => !prev.some((f) => f.name === file.name));
      return [...prev, ...newFiles];
    });
  };

  const handleCancel = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  return { files, handleDrop, handleCancel };
};

export {
  ClassicFileUpload,
  ExtendedFileUpload,
  MinimalFileUpload,
  StrictMinimalImageUpload,
  useFileUpload,
  type DropAreaProps,
};
