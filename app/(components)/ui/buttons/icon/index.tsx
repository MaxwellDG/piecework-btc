import './styles.scss';

type Props = {
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    icon: JSX.Element;
};

export default function IconButton({ onClick, icon }: Props) {
    return (
        <button
            className="p-1 hover:bg-[rgba(61,211,165,0.3)] icon-button-border"
            onClick={onClick}
        >
            {icon}
        </button>
    );
}
