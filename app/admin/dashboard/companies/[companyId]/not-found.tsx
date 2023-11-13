import NotFound from '../../../../(components)/notFound';

export default function TasksNotFound() {
    return (
        <NotFound
            text="Could not find any companies associated with the given id"
            isAdmin
        />
    );
}
