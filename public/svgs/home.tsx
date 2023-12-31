export default function Home(color: string, size: number, className?: string) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                id="vector"
                d="M19 23H5C3.34315 23 2 21.6569 2 20V11.563C2 10.4094 2.49808 9.31192 3.36639 8.55236L10.0248 2.72784C11.1558 1.7385 12.8442 1.73851 13.9752 2.72784L20.6336 8.55236C21.5019 9.31192 22 10.4094 22 11.563V20C22 21.6569 20.6569 23 19 23Z"
                stroke={color}
                strokeWidth="1"
                strokeLinecap="round"
            />
            <path
                id="vector_2"
                d="M12 16L12 19"
                stroke={color}
                strokeWidth="1"
                strokeLinecap="round"
            />

            <defs>
                <clipPath id="clip0_1_129">
                    <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 24) rotate(-90)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
}
