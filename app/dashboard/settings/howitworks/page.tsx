import BackButton from '../../../(components)/ui/buttons/back';
import HeroScreenContainer from '../../../(components)/containers/hero-screen-container';
import MainContent from '../../../(components)/containers/main-content';
import Home from '../../../../public/svgs/home';
import Messages from '../../../../public/svgs/messages';
import Projects from '../../../../public/svgs/projects';
import Settings from '../../../../public/svgs/settings';
import ArrowCornersCard from '../../../(components)/containers/cards/arrow-corners';

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
                <ArrowCornersCard
                    header={
                        <div className="flex items-center">
                            {Home('#F2A900', 30)}
                            <h2 className="font-bold ml-2 text-3xl">Home</h2>
                        </div>
                    }
                    className="mb-6"
                    canOverflow={false}
                >
                    <ul
                        className="lg:ml-6 p-2"
                        style={{ listStyle: 'outside', listStyleType: 'disc' }}
                    >
                        <li>
                            <p>
                                <span className="font-semibold">
                                    Activity:&nbsp;
                                </span>
                                <span className="text-normalText">
                                    See what you and your team members have been
                                    up to
                                </span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="font-semibold">
                                    Tasks:&nbsp;
                                </span>
                                <span className="text-normalText">
                                    A counter of all of the created and
                                    completed tasks for your company
                                </span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="font-semibold">
                                    Pending actions:&nbsp;
                                </span>
                                <span className="text-normalText">
                                    {`Anything that requires a response from you in
                                regards to a task while be posted here to notify
                                you. You can click on these to be navigated
                                directly to what needs to be addressed.`}
                                </span>
                            </p>
                        </li>
                    </ul>
                </ArrowCornersCard>
                <ArrowCornersCard
                    header={
                        <div className="flex items-center">
                            {Projects(30, '#F2A900')}
                            <h2 className="font-bold ml-2 text-3xl">
                                Projects
                            </h2>
                        </div>
                    }
                    canOverflow={false}
                    className="mb-6"
                >
                    <ul
                        className="lg:ml-6 p-2"
                        style={{ listStyle: 'outside', listStyleType: 'disc' }}
                    >
                        <li>
                            <p>
                                <span className="font-semibold">
                                    Projects:&nbsp;
                                </span>
                                <span className="text-normalText">
                                    Create and organize your work into projects
                                </span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="font-semibold">
                                    Tasks:&nbsp;
                                </span>
                                <span className="text-normalText">
                                    {`Click on a project to go to the 'Tasks' screen.
                                Here you can create specific tasks{' '}`}
                                </span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="font-semibold">
                                    Task Status:&nbsp;
                                </span>
                                <span className="text-normalText">
                                    {`A Piecework-BTC team member will either be
                                assigned to your task, or will contact you about
                                negotiating the price. If a price is agreed
                                upon, the team member will begin working on the
                                project. Make sure to revisit this page often,
                                as the status of your task will be updated here.`}
                                </span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="font-semibold">
                                    Payment:&nbsp;
                                </span>
                                <span className="text-normalText">
                                    {`When both parties agree a task is completed, a
                                BTC address will be shown on the respective task
                                screen. Payment must be made here in order to
                                continue adding future tasks. As successful
                                payments are made overtime, the maximum amount
                                of tasks alotted will be increased`}
                                </span>
                            </p>
                        </li>
                    </ul>
                </ArrowCornersCard>
                <ArrowCornersCard
                    header={
                        <div className="flex items-center">
                            {Messages(30, '#F2A900')}
                            <h2 className="font-bold ml-2 text-3xl">
                                Messages
                            </h2>
                        </div>
                    }
                    canOverflow={false}
                    className="mb-6"
                >
                    <div className="p-2">
                        <p className="lg:ml-6 text-normalText">
                            {`Communicate directly with the Piecework-BTC team about
                        anything you'd like.`}
                        </p>
                        <p className="lg:ml-6 text-normalText">
                            Responses will be sent in less than 24 hours.
                        </p>
                    </div>
                </ArrowCornersCard>
                <ArrowCornersCard
                    header={
                        <div className="flex items-center">
                            {Settings('#F2A900', 30)}
                            <h2 className="font-bold ml-2 text-3xl">
                                Settings
                            </h2>
                        </div>
                    }
                    canOverflow={false}
                    className="mb-1"
                >
                    <ul
                        className="lg:ml-6 p-2"
                        style={{ listStyle: 'outside', listStyleType: 'disc' }}
                    >
                        <li>
                            <p>
                                <span className="font-semibold">
                                    Account settings:&nbsp;
                                </span>
                                <span className="text-normalText">{`Update your account's username and password`}</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="font-semibold">
                                    Company settings:&nbsp;
                                </span>
                                <span className="text-normalText">{`View, add, remove users from your company.`}</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="font-semibold">
                                    How it works:&nbsp;
                                </span>
                                <span className="text-normalText">{`Hi. That's where you are right now`}</span>
                            </p>
                        </li>
                    </ul>
                </ArrowCornersCard>
            </MainContent>
        </HeroScreenContainer>
    );
}
