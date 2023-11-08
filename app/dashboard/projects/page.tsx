import HeroScreenContainer from '../../(components)/containers/hero-screen-container';
import AddProject from '../../(components)/projects/addProject';
import ProjectsList from '../../(components)/projects/projectsList';

export default function Projects() {
    return (
        <HeroScreenContainer>
            <div className="flex flex-col justify-between items-start md:flex-row mb-2">
                <h2 className="text-4xl font-bold mb-8">Projects</h2>
                <AddProject />
            </div>
            <ProjectsList />
        </HeroScreenContainer>
    );
}
