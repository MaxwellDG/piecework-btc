import { useState } from 'react';

type Props = {
    onClick?: () => void;
};

export default function CloseButton({ onClick }: Props) {
    const [isHover, toggleHover] = useState(false);

    return <div></div>;
}
