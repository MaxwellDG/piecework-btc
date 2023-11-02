import { NextResponse } from 'next/server';
import sendEmail from '../../(services)/mailer';

export async function POST(req: Request) {
    const company = req.headers.get('jwt-company') as string;

    const { subject } = await req.json();

    if (company) {
        console.log('sending email', company);
        await sendEmail(subject, company);

        return NextResponse.json({ message: 'Email sent' }, { status: 200 });
    } else {
        return NextResponse.json(
            { success: false, message: 'Email error' },
            { status: 500 }
        );
    }
}
