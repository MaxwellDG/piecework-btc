import NotFound from './(components)/notFound';

export default function ProjectNotFound() {
    return (
        <NotFound
            text="Could not find any resources for the given URL"
            isAdmin={false}
        />
    );
}
