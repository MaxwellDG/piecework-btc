import { headers } from 'next/headers';

// returns the last segment of the url path as id

export default function usePathnameServer(): { id: string; path: string } {
    const _headers = headers();
    const path: string = _headers.get('x-invoke-path') as string;
    const pathSplit: string[] = path.split('/');
    const id: string = pathSplit[pathSplit.length - 1];

    return { id, path };
}
