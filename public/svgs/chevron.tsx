export default function Chevron(
    color: string,
    size: number,
    rotation?: number
) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            rotate={rotation}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.9394 12.0001L8.46973 6.53039L9.53039 5.46973L16.0607 12.0001L9.53039 18.5304L8.46973 17.4697L13.9394 12.0001Z"
                fill={color}
            />
        </svg>
    );
}