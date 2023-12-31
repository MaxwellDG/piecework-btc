export default function Logout(size: number, color: string) {
    return (
        <svg
            height={size}
            width={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="4 4 16 16"
        >
            {' '}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 4H13V9H11.5V5.5H5.5V18.5H11.5V15H13V20H4V4Z"
                fill={color}
            ></path>{' '}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.1332 11.25L15.3578 9.47463L16.4184 8.41397L20.0045 12L16.4184 15.586L15.3578 14.5254L17.1332 12.75H9V11.25H17.1332Z"
                fill={color}
            ></path>{' '}
        </svg>
    );
}
