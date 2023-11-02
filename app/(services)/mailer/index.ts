import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        user: process.env.SUPER_ADMIN_EMAIL_SENDER,
        pass: process.env.SUPER_ADMIN_EMAIL_SENDER_PASS,
    },
});

export enum EMAIL_SUBJECT_TYPE {
    CREATED_COMPANY = 'Created company',
    CREATED_TASK = 'Created task',
    UPDATED_TASK = 'Updated task',
    RECEIVED_MESSAGE = 'Received message',
}

function getText(
    subject: EMAIL_SUBJECT_TYPE,
    companyId: string,
    extraText?: string
) {
    switch (subject) {
        case EMAIL_SUBJECT_TYPE.CREATED_COMPANY:
            return 'Created company: ' + companyId;
        case EMAIL_SUBJECT_TYPE.CREATED_TASK:
            return companyId + 'created task: ' + extraText;
        case EMAIL_SUBJECT_TYPE.UPDATED_TASK:
            return companyId + 'updated task: ' + extraText;
        case EMAIL_SUBJECT_TYPE.RECEIVED_MESSAGE:
            return companyId + 'sent you a message: ' + extraText;
    }
}

export default async function sendEmail(
    subject: EMAIL_SUBJECT_TYPE,
    companyId: string,
    extraText?: string
) {
    console.log(
        'even trying???',
        process.env.SUPER_ADMIN_EMAIL_SENDER,
        process.env.SUPER_ADMIN_EMAIL_SENDER_PASS,
        process.env.SUPER_ADMIN_EMAIL
    );
    try {
        const info = await transporter.sendMail({
            from: `Piecework-BTC <${process.env.SUPER_ADMIN_EMAIL_SENDER}>`,
            to: process.env.SUPER_ADMIN_EMAIL,
            subject,
            text: getText(subject, companyId, extraText),
        });
        console.log('EMAIL SENT:', info);
    } catch (e) {
        console.log('err sending email');
    }
}
