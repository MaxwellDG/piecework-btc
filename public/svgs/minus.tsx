export default function Minus(color: string, size: number) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 0h48v48H0z" fill="none" />
            <rect
                x="8"
                y="22"
                width="30"
                height="4"
                stroke={color}
                fill={color}
            />
        </svg>
    );
}
