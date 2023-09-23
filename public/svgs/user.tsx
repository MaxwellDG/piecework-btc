export default function User(color: string, size: number) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                stroke={color}
                d="M12 1.2A4.8 4.8 0 1 0 16.8 6 4.805 4.805 0 0 0 12 1.2zm0 8.6A3.8 3.8 0 1 1 15.8 6 3.804 3.804 0 0 1 12 9.8zM20 22H4v-4.5A5.506 5.506 0 0 1 9.5 12h5a5.506 5.506 0 0 1 5.5 5.5zM5 21h14v-3.5a4.505 4.505 0 0 0-4.5-4.5h-5A4.505 4.505 0 0 0 5 17.5z"
            />
        </svg>
    );
}
