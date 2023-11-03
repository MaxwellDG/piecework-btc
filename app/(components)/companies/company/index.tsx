import Link from 'next/link';
import Messages from '../../../../public/svgs/messages';
import Projects from '../../../../public/svgs/projects';
import NotificationCircle from '../../notificationCircle';
import { ICompany } from '../../../../db/models/company/types';

type Props = {
    company: ICompany;
};

export default function Company({ company }: Props) {
    const { _id, name, updatedAt, viewedBySuperAdmin }: ICompany = company;

    return (
        <div className="w-full p-2 mb-2 flex justify-between border">
            <div className="flex flex-col justify-between">
                <p className="text-xl font-semibold">{name}</p>
                <p>
                    {new Date(updatedAt).toLocaleDateString()}{' '}
                    {new Date(updatedAt).toLocaleTimeString()}
                </p>
            </div>
            <div className="flex gap-x-2 items-center">
                <Link href={`/admin/dashboard/messages/${_id}`}>
                    <div className="button">{Messages('black', 30)}</div>
                </Link>
                <Link href={`/admin/dashboard/projects/${_id}`}>
                    <div className="button">{Projects('black', 30)}</div>
                </Link>
            </div>
            {!viewedBySuperAdmin ? (
                <NotificationCircle color="red" size={10} />
            ) : null}
        </div>
    );
}
