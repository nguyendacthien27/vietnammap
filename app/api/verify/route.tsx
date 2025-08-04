import {NextRequest, NextResponse} from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json({error: 'Token is missing'}, {status: 400});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { email: string };
        const sessionToken = jwt.sign({email: decoded.email}, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1h',
        });

        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.set({
            name: 'auth',
            value: sessionToken,
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60,
            path: '/',
        });

        return response;
    } catch (error) {
        return NextResponse.json({error: 'Invalid or expired token'}, {status: 401});
    }
}