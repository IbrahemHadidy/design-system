import preview from '#storybook/preview';
import { Attachment } from '@/components/ui/upload-field/attachment';

const meta = preview.meta({
  title: 'Form/FileUpload/Attachment',
  component: Attachment,

  argTypes: {
    type: {
      control: 'radio',
      options: ['basic', 'upload'],
      description:
        'Type of attachment: "basic" for static file display, "upload" to show upload progress.',
    },
    border: {
      control: 'radio',
      options: ['none', 'line', 'dashed'],
      description: 'Border style of the attachment container.',
    },
    background: {
      control: 'radio',
      options: ['none', 'primary'],
      description: 'Background style of the attachment container.',
    },
    iconBg: {
      control: 'radio',
      options: ['default', 'secondary'],
      description: 'Background style of the icon wrapper.',
    },
    iconBorder: {
      control: 'radio',
      options: ['square', 'circular'],
      description: 'Shape of the icon wrapper.',
    },
    closeBtn: {
      control: 'radio',
      options: ['default', 'circle'],
      description: 'Style of the close button icon.',
    },
    uploadPercent: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Current upload progress percentage. Only used when type is "upload".',
    },
    title: {
      control: 'text',
      description: 'Title or name of the attached file.',
    },
    size: {
      control: 'text',
      description: 'File size to display, e.g., "12 KB".',
    },
    onCancel: {
      action: 'cancelled',
      description:
        'Function called when the user clicks the close button to remove the attachment.',
    },
  },
});

export const Playground = meta.story({
  args: {
    type: 'upload',
    border: 'line',
    background: 'none',
    iconBg: 'default',
    iconBorder: 'square',
    closeBtn: 'default',
    title: 'Playground Attachment',
    size: '3 MB',
    uploadPercent: 50,
    onCancel: () => console.log('Cancelled'),
  },
  render: (args) => (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Attachment {...args} />
    </div>
  ),
});

export const AllVariants = meta.story({
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-6">
      {/* Basic Attachment - no border */}
      <Attachment
        title="Basic Attachment"
        size="2 MB"
        onCancel={() => console.log('Cancelled')}
        type="basic"
        border="none"
        background="none"
        iconBg="default"
        iconBorder="square"
        closeBtn="default"
      />

      {/* Upload Attachment - line border */}
      <Attachment
        title="Upload in Progress"
        size="5 MB"
        onCancel={() => console.log('Cancelled')}
        type="upload"
        border="line"
        background="none"
        iconBg="default"
        iconBorder="square"
        closeBtn="circle"
        uploadPercent={40}
      />

      {/* Upload Attachment - dashed border */}
      <Attachment
        title="Upload Dashed Border"
        size="8 MB"
        onCancel={() => console.log('Cancelled')}
        type="upload"
        border="dashed"
        background="none"
        iconBg="secondary"
        iconBorder="circular"
        closeBtn="circle"
        uploadPercent={70}
      />

      {/* Primary background */}
      <Attachment
        title="Primary Background"
        size="1.2 MB"
        onCancel={() => console.log('Cancelled')}
        type="basic"
        border="none"
        background="primary"
        iconBg="default"
        iconBorder="circular"
        closeBtn="default"
      />

      {/* Full upload completed */}
      <Attachment
        title="Upload Completed"
        size="3 MB"
        onCancel={() => console.log('Cancelled')}
        type="upload"
        border="line"
        background="none"
        iconBg="secondary"
        iconBorder="square"
        closeBtn="default"
        uploadPercent={100}
      />
    </div>
  ),
});
