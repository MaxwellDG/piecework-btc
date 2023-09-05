type Props = {
  text: string;
};

export default function ErrorText({ text }: Props) {
  return <p className="bg-error">{text}</p>;
}
