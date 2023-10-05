import Link from 'next/link';
import { ICompany } from '../../../../db/modeling/company';
import Messages from '../../../../public/svgs/messages';
import Projects from '../../../../public/svgs/projects';
import NotificationCircle from '../../notificationCircle';

type Props = {
    company: ICompany;
};

export default function Company({ company }: Props) {
    const { _id, name, updatedAt, updateViewedByAdmin }: ICompany = company;

    return (
        <div className="w-full p-2 mb-2 flex justify-between border">
            <div className="flex flex-col justify-between">
                <p>{name}</p>
                <p>{updatedAt.toLocaleString()}</p>
            </div>
            <div className="flex gap-y-1 items-center">
                <Link href={`/admin/dashboard/messages/${_id}`}>
                    {Messages('black', 20)}
                </Link>
                <Link href={`/admin/dashboard/projects/${_id}`}>
                    {Projects('black', 20)}
                </Link>
            </div>
            {!updateViewedByAdmin ? (
                <NotificationCircle color="red" size={10} />
            ) : null}
        </div>
    );
}
