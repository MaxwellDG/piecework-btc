import Link from 'next/link';
import Chevron from '../../../../public/svgs/chevron';
import { ICompany } from '../../../../db/modeling/company';

type Props = {
    company: ICompany;
};

export default function Company({ company }: Props) {
    const { _id, name, updatedAt, createdAt } = company;

    return (
        <Link
            href={`/admin/projects/${_id}`}
            className="w-full p-2 mb-2 flex justify-between border"
        >
            <div>
                <p>{name}</p>
            </div>
            {Chevron('black', 25)}
        </Link>
    );
}
