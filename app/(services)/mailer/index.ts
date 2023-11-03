import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        user: process.env.SUPER_ADMIN_EMAIL_SENDER,
        pass: process.env.SUPER_ADMIN_EMAIL_SENDER_PASS,
    },
});

function generateHTML(
    newCompanies: string[],
    unseenTasks: string[],
    newMessages: string[]
) {
    return `
    <div>
        <h2>New Companies:</h2>
        <ul>
            ${newCompanies.map((text) => `<li>${text}</li>`)}
        </ul>
        <h2>Unseen Tasks:</h2>
        <ul>
            ${unseenTasks.map((text) => `<li>${text}</li>`)}
        </ul>
        <h2>New Messages:</h2>
        <ul>
            ${newMessages.map((text) => `<li>${text}</li>`)}
        </ul>
    </div>
    `;
}

export default async function sendEmail(
    newCompanies: string[],
    unseenTasks: string[],
    newMessages: string[]
) {
    try {
        const info = await transporter.sendMail({
            from: `Piecework-BTC <${process.env.SUPER_ADMIN_EMAIL_SENDER}>`,
            to: process.env.SUPER_ADMIN_EMAIL,
            subject: 'Daily updates',
            text: "Here's your daily updates",
            html: generateHTML(newCompanies, unseenTasks, newMessages),
        });
        console.log('EMAIL SENT:', info);
    } catch (e) {
        console.log('err sending email');
    }
}
