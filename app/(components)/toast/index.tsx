import Alert from '../../../public/svgs/alert';

type Props = {
    text: string;
};

export default function Toast({ text }: Props) {
    return (
        <div className="alert">
            {Alert('#3bbef8', 20)}
            <span>{text}</span>
        </div>
    );
}
