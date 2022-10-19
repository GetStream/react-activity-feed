import { SyntheticEvent } from 'react';
import { OGAPIResponse } from 'getstream';
export declare type VideoProps = {
    og: OGAPIResponse;
    handleClose?: (event: SyntheticEvent) => void;
    urlsThatAreGifs?: Array<string>;
};
export declare const Video: ({ og: { videos, images, url: ogURL, title, description, site_name: siteName }, handleClose, urlsThatAreGifs: gifHosts, }: VideoProps) => JSX.Element | null;
//# sourceMappingURL=Video.d.ts.map