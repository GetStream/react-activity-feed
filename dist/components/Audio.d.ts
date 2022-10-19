import React from 'react';
import { OGAPIResponse } from 'getstream';
import { PropsWithElementAttributes } from '../utils';
declare type AudioProps = PropsWithElementAttributes<{
    og: OGAPIResponse;
    handleClose?: (event: React.SyntheticEvent) => void;
}>;
export declare const Audio: ({ og: { audios, images, description, title }, handleClose, className, style, }: AudioProps) => JSX.Element;
export {};
//# sourceMappingURL=Audio.d.ts.map