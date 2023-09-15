type Props = {
    text: string;
};

export default function ErrorText({ text }: Props) {
    return <p className="text-red-500">{text}</p>;
}
