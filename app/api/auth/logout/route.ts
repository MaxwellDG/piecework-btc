import { NextResponse } from 'next/server';

export function POST() {
    const res = new NextResponse();
    res.cookies.delete('JWT');

    return res;
}
