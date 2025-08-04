import {NextRequest, NextResponse} from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
    const cookie = request.cookies.get('auth')?.value;
    if (!cookie) {
        return NextResponse.json({authenticated: false});
    }

    try {
        jwt.verify(cookie, process.env.JWT_SECRET || 'secret');
        return NextResponse.json({authenticated: true});
    } catch (error) {
        return NextResponse.json({authenticated: false});
    }
}