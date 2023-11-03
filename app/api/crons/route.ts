import { NextResponse } from 'next/server';
import { PopulatedIMail } from '../../../db/models/mail/types';
import sendEmail from '../../(services)/mailer';
import { EMAIL_SUBJECT_TYPE } from '../../(services)/mailer/types';
import MailHandler from '../../../db/models/mail';

export async function GET() {
    const data: PopulatedIMail[] = await MailHandler.findAll();

    if (data?.length) {
        try {
            let newCompanies: string[] = [];
            let unseenTasks: string[] = [];
            let newMessages: string[] = [];

            data.forEach((datum) => {
                switch (datum?.subject) {
                    case EMAIL_SUBJECT_TYPE.CREATED_COMPANY: {
                        newCompanies.push(
                            `${datum.company._id}: ${datum.company.name}`
                        );
                        break;
                    }
                    case EMAIL_SUBJECT_TYPE.RECEIVED_MESSAGE: {
                        newMessages.push(
                            `${datum.company._id}: ${datum.extraText}`
                        );
                        break;
                    }
                    // currently EMAIL_SUBJECT_TYPE.CREATED_TASK or EMAIL_SUBJECT_TYPE.UPDATED_TASK
                    default: {
                        unseenTasks.push(
                            `${datum.company._id}: ${
                                datum.subject ===
                                EMAIL_SUBJECT_TYPE.CREATED_TASK
                                    ? 'Created'
                                    : 'Updated'
                            } ${datum.extraText}`
                        );
                    }
                }
            });

            await sendEmail(newCompanies, unseenTasks, newMessages);

            // since this feature is only for the super admin, we can delete all the emails
            await MailHandler.deleteAll();

            return NextResponse.json({ success: true }, { status: 200 });
        } catch (e) {
            console.log('ERROR IN CRON', e);
            return NextResponse.json({ success: false }, { status: 500 });
        }
    } else {
        return NextResponse.json({ success: true }, { status: 200 });
        // no op
    }
}
