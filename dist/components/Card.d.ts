import { SyntheticEvent } from 'react';
import { OGAPIResponse } from 'getstream';
import { PropsWithElementAttributes } from '../utils';
export declare type CardProps = PropsWithElementAttributes<{
    alt?: string;
    handleClose?: (e: SyntheticEvent) => void;
    image?: string | null;
    nolink?: boolean;
} & Pick<OGAPIResponse, 'description' | 'images' | 'url' | 'title'>, HTMLAnchorElement>;
export declare const Card: ({ alt, images, image: imageURL, handleClose, description, nolink, url, title, className, style, }: CardProps) => JSX.Element;
//# sourceMappingURL=Card.d.ts.map