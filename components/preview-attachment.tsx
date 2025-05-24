import type { Attachment } from 'ai';
import { LoaderIcon } from './icons';

export const PreviewAttachment = ({
  attachment,
  isUploading = false,
  chatId,
  onDelete,
}: {
  attachment: Attachment;
  isUploading?: boolean;
  chatId?: string;
  onDelete?: (attachment: Attachment) => void;
}) => {
  const { name, url, contentType } = attachment;

  return (
    <div data-testid="input-attachment-preview" className="flex flex-col gap-2">
      <div className="w-20 h-16 aspect-video bg-muted rounded-md relative flex flex-col items-center justify-center">
        {contentType?.startsWith('image') ? (
          <img
            key={url}
            src={url}
            alt={name ?? 'An image attachment'}
            className="rounded-md size-full object-cover"
          />
        ) : (
          <div className="" />
        )}

        {isUploading && (
          <div
            data-testid="input-attachment-loader"
            className="animate-spin absolute text-zinc-500"
          >
            <LoaderIcon />
          </div>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(attachment)}
            className="absolute top-0 right-0 m-1 text-white bg-black bg-opacity-50 rounded-full w-5 h-5 flex items-center justify-center hover:bg-opacity-70 transition"
            aria-label="Remove attachment"
          >
            &times;
          </button>
        )}
      </div>
      <div className="text-xs text-zinc-500 max-w-16 truncate">{name}</div>
    </div>
  );
};
