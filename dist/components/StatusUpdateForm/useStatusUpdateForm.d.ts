import { SyntheticEvent, ClipboardEvent, FormEvent } from 'react';
import { EmojiData } from 'emoji-mart';
import { UploadState } from 'react-file-utils';
import { OGAPIResponse, UR } from 'getstream';
import { DefaultAT, DefaultUT } from '../../context';
import { StatusUpdateFormProps } from './StatusUpdateForm';
export declare type FileUploadState = {
    file: File | Blob;
    id: string;
    state: UploadState;
    url?: string;
};
export declare type ImageUploadState = FileUploadState & {
    previewUri?: string;
};
declare type ImagesState = {
    data: Record<string, ImageUploadState>;
    order: string[];
};
declare type FilesState = {
    data: Record<string, FileUploadState>;
    order: string[];
};
export declare function useStatusUpdateForm<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ activityVerb, feedGroup, modifyActivityData, doRequest, userId, onSuccess, }: {
    activityVerb: string;
    feedGroup: string;
} & Pick<StatusUpdateFormProps<AT>, 'doRequest' | 'modifyActivityData' | 'onSuccess' | 'userId'>): {
    userData: UT;
    textInputRef: import("react").MutableRefObject<HTMLTextAreaElement | undefined>;
    text: string;
    submitting: boolean;
    files: FilesState;
    images: ImagesState;
    activeOg: OGAPIResponse | undefined;
    availableOg: OGAPIResponse[];
    isOgScraping: boolean;
    ogActiveUrl: string;
    onSubmitForm: (e: FormEvent) => Promise<void>;
    onSelectEmoji: (emoji: EmojiData) => void;
    insertText: (insertedText: string) => void;
    onChange: (event: SyntheticEvent<HTMLTextAreaElement>) => void;
    dismissOg: (e?: SyntheticEvent<Element, Event> | undefined) => void;
    setActiveOg: (url: string) => void;
    canSubmit: () => boolean;
    uploadNewFiles: (files: FileList | Blob[] | File[]) => void;
    uploadFile: (id: string, file: FileUploadState) => Promise<void>;
    uploadImage: (id: string, img: ImageUploadState) => Promise<void>;
    removeFile: (id: string) => void;
    removeImage: (id: string) => void;
    onPaste: (event: ClipboardEvent<HTMLTextAreaElement>) => Promise<void>;
};
export {};
//# sourceMappingURL=useStatusUpdateForm.d.ts.map