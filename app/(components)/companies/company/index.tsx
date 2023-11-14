import Link from 'next/link';
import Messages from '../../../../public/svgs/messages';
import Projects from '../../../../public/svgs/projects';
import NotificationCircle from '../../notificationCircle';
import { ICompany } from '../../../../db/models/company/types';
import ArrowCornersCard from '../../containers/cards/arrow-corners';
import IconButton from '../../ui/buttons/icon';

type Props = {
    company: ICompany;
};

export default function Company({ company }: Props) {
    const { _id, name, updatedAt, viewedBySuperAdmin }: ICompany = company;

    return (
        <ArrowCornersCard className="mb-2 cursor-pointer">
            <div className="w-full p-2 flex justify-between">
                <div className="flex flex-col justify-between">
                    <div className="flex gap-x-2 items-center">
                        <p className="text-xl font-semibold">{name}</p>
                        {!viewedBySuperAdmin && (
                            <div className="h-2 w-2 rounded bg-btcOrange" />
                        )}
                    </div>
                    <p className="text-whiteGray">
                        {new Date(updatedAt).toDateString()}
                    </p>
                </div>
                <div className="flex gap-x-2 items-center mr-2">
                    <Link href={`/admin/dashboard/messages/${_id}`}>
                        <IconButton
                            icon={Messages(30, '#cbced3')}
                            onClick={() => {}}
                        />
                    </Link>
                    <Link href={`/admin/dashboard/companies/${_id}`}>
                        <IconButton
                            icon={Projects(30, '#cbced3')}
                            onClick={() => {}}
                        />
                    </Link>
                </div>
                {!viewedBySuperAdmin ? (
                    <NotificationCircle color="red" size={10} />
                ) : null}
            </div>
        </ArrowCornersCard>
    );
}
