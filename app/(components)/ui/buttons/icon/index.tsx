import './styles.scss';

type Props = {
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    icon: JSX.Element;
    className?: string;
};

export default function IconButton({ onClick, icon, className }: Props) {
    return (
        <button
            className={`p-1 hover:bg-[rgba(61,211,165,0.3)] icon-button-border ${
                className ?? ''
            }`}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}
