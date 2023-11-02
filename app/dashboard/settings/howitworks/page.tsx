import BackButton from '../../../(components)/buttons/back';
import HeroScreenContainer from '../../../(components)/containers/hero-screen-container';
import MainContent from '../../../(components)/containers/main-content';
import Home from '../../../../public/svgs/home';
import Messages from '../../../../public/svgs/messages';
import Projects from '../../../../public/svgs/projects';
import Settings from '../../../../public/svgs/settings';

export default function Page() {
    return (
        <HeroScreenContainer>
            <BackButton route="/dashboard/settings" />
            <MainContent>
                <p className="mb-8">
                    {`    Piecework-BTC is a tool to help
                    connect employers with freelancers in the world of software
                    development. What makes us different is that we have less
                    overhead, and less fluff. We take no fees, and only gather
                    minimal information. All that matters is connecting one
                    entity with another to complete a certain task.`}
                </p>
                <div className="flex items-center mb-4">
                    {Home('black', 30)}
                    <h2 className="font-bold ml-2 text-3xl">Home</h2>
                </div>
                <ul
                    className="lg:ml-12 mb-8"
                    style={{ listStyle: 'outside', listStyleType: 'disc' }}
                >
                    <li>
                        <span className="flex">
                            <p className="font-semibold">Activity:&nbsp;</p>
                            <p>
                                See what you and your team members have been up
                                to
                            </p>
                        </span>
                    </li>
                    <li>
                        <span className="flex">
                            <p className="font-semibold">Tasks:&nbsp;</p>
                            <p>
                                A counter of all of the created and completed
                                tasks for your company
                            </p>
                        </span>
                    </li>
                    <li>
                        <span className="flex">
                            <p className="font-semibold whitespace-nowrap">
                                Pending actions:&nbsp;
                            </p>
                            <p>
                                Anything that requires a response from you in
                                regards to a task while be posted here to notify
                                you. You can click on these to be navigated
                                directly to what needs to be addressed.
                            </p>
                        </span>
                    </li>
                </ul>
                <div className="flex items-center mb-4">
                    {Projects('black', 30)}
                    <h2 className="font-bold ml-2 text-3xl">Projects</h2>
                </div>
                <ul
                    className="lg:ml-12 mb-8"
                    style={{ listStyle: 'outside', listStyleType: 'disc' }}
                >
                    <li>
                        <span className="flex">
                            <p className="font-semibold">Projects:&nbsp;</p>
                            <p>Create and organize your work into projects</p>
                        </span>
                    </li>
                    <li>
                        <span className="flex">
                            <p className="font-semibold">Tasks:&nbsp;</p>
                            <p>
                                Click on a project to go to the 'Tasks' screen.
                                Here you can create specific tasks{' '}
                            </p>
                        </span>
                    </li>
                    <li>
                        <span className="flex">
                            <p className="font-semibold whitespace-nowrap">
                                Task Status:&nbsp;
                            </p>
                            <p>
                                A Piecework-BTC team member will either be
                                assigned to your task, or will contact you about
                                negotiating the price. If a price is agreed
                                upon, the team member will begin working on the
                                project. Make sure to revisit this page often,
                                as the status of your task will be updated here.
                            </p>
                        </span>
                    </li>
                    <li>
                        <span className="flex">
                            <p className="font-semibold">Payment:&nbsp;</p>
                            <p>
                                When both parties agree a task is completed, a
                                BTC address will be shown on the respective task
                                screen. Payment must be made here in order to
                                continue adding future tasks. As successful
                                payments are made overtime, the maximum amount
                                of tasks alotted will be increased
                            </p>
                        </span>
                    </li>
                </ul>
                <div className="flex items-center mb-4">
                    {Messages('black', 30)}
                    <h2 className="font-bold ml-2 text-3xl">Messages</h2>
                </div>
                <p>
                    Communicate directly with the Piecework-BTC team about
                    anything you'd like.
                </p>
                <p className="mb-8">
                    Responses will be sent in less than 24 hours.
                </p>
                <div className="flex items-center mb-4">
                    {Settings('black', 30)}
                    <h2 className="font-bold ml-2 text-3xl">Settings</h2>
                </div>
                <ul
                    className="lg:ml-12 mb-8"
                    style={{ listStyle: 'outside', listStyleType: 'disc' }}
                >
                    <li>
                        <span className="flex">
                            <p className="font-semibold whitespace-nowrap">
                                Account settings:&nbsp;
                            </p>
                            <p>Update your account's username and password</p>
                        </span>
                    </li>
                    <li>
                        <span className="flex">
                            <p className="font-semibold whitespace-nowrap">
                                Company settings:&nbsp;
                            </p>
                            <p>View, add, remove users from your company.</p>
                        </span>
                    </li>
                    <li>
                        <span className="flex">
                            <p className="font-semibold whitespace-nowrap">
                                How it works:&nbsp;
                            </p>
                            <p>Hi. That's where you are right now</p>
                        </span>
                    </li>
                </ul>
            </MainContent>
        </HeroScreenContainer>
    );
}
