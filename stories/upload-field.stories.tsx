import preview from '#storybook/preview';
import { AttachmentList, UploadField, useFileUpload } from '@/components/ui/upload-field';

const meta = preview.meta({
  title: 'Form/UploadField',
  component: UploadField,
  argTypes: {
    variant: {
      control: 'select',
      options: ['minimal', 'strict-minimal', 'extended', 'classic'],
    },
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
    },
  },
});

export const Playground = meta.story({
  args: {
    variant: 'minimal',
    type: 'multiple',
    supportedFiles: ['.jpg', '.png', '.svg', '.zip'],
    maxSize: '10MB',
    onDrop: () => {},
  },
  render: (args) => {
    const { files, handleDrop, handleCancel } = useFileUpload(args.type);
    return (
      <div className="max-w-md space-y-4">
        <UploadField
          {...args}
          onDrop={handleDrop}
          selectedFiles={<AttachmentList files={files} onCancel={handleCancel} />}
        />
      </div>
    );
  },
});

export const Minimal = meta.story({
  args: {
    variant: 'minimal',
    type: 'single',
    supportedFiles: ['.jpg', '.png', '.svg'],
    maxSize: '5MB',
    onDrop: () => {},
  },
  render: (args) => {
    const { files, handleDrop, handleCancel } = useFileUpload(args.type);
    return (
      <div className="max-w-lg space-y-3">
        <UploadField
          {...args}
          onDrop={handleDrop}
          selectedFiles={<AttachmentList files={files} onCancel={handleCancel} />}
        />
      </div>
    );
  },
});

export const StrictMinimal = meta.story({
  args: {
    variant: 'strict-minimal',
    ratio: '1/1',
    type: 'single',
    supportedFiles: ['.jpg', '.png'],
    onDrop: () => {},
  },
  render: (args) => {
    const { files, handleDrop, handleCancel } = useFileUpload(args.type);
    return (
      <div className="max-w-lg space-y-3">
        <UploadField
          {...args}
          onDrop={handleDrop}
          selectedFiles={<AttachmentList files={files} onCancel={handleCancel} />}
        />
      </div>
    );
  },
});

export const Extended = meta.story({
  args: {
    variant: 'extended',
    type: 'multiple',
    supportedFiles: ['.jpg', '.png', '.svg', '.zip'],
    maxSize: '10MB',
    onDrop: () => {},
  },
  render: (args) => {
    const { files, handleDrop, handleCancel } = useFileUpload(args.type);
    return (
      <div className="max-w-lg space-y-3">
        <UploadField
          {...args}
          onDrop={handleDrop}
          selectedFiles={<AttachmentList files={files} onCancel={handleCancel} />}
        />
      </div>
    );
  },
});

export const Classic = meta.story({
  args: {
    variant: 'classic',
    type: 'multiple',
    supportedFiles: ['.jpg', '.png', '.svg', '.zip'],
    maxSize: '10MB',
    onDrop: () => {},
  },
  render: (args) => {
    const { files, handleDrop, handleCancel } = useFileUpload(args.type);
    return (
      <div className="max-w-lg space-y-3">
        <UploadField
          {...args}
          onDrop={handleDrop}
          selectedFiles={<AttachmentList files={files} onCancel={handleCancel} />}
        />
      </div>
    );
  },
});
