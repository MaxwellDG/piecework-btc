import NotFound from '../../../../../(components)/notFound';

export default function TasksNotFound() {
    return (
        <NotFound
            text="Could not find any projects associated with the given project id"
            isAdmin
        />
    );
}
