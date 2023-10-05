type Props = {
    color: string;
    size: number;
};

export default function NotificationCircle({ color, size }: Props) {
    return (
        <div
            className={`absolute -top-[${Math.round(
                size / 2
            )}] -right-[${Math.round(
                size / 2
            )}]h-[${size}px] w-[${size}px] rounded-[${Math.ceil(
                size / 2
            )}px] bg-[${color}]`}
        />
    );
}
