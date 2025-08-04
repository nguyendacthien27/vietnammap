import {NextRequest, NextResponse} from 'next/server';
import {Resend} from 'resend';
import jwt from 'jsonwebtoken';

const resend = new Resend(process.env.RESEND_KEY_API);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const email = body.email as string;

        if (null == email) {
            return NextResponse.json({error: 'Invalid email'}, {status: 400});
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1h',
        });

        const origin = request.headers.get('origin');
        const magicLink = `${origin}/api/verify?token=${token}`;

        const {error} = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Your Magic Login Link',
            html: `<p>Click <a href="${magicLink}">here</a> to log in.</p>`,
        });

        if (error) {
            return NextResponse.json({error}, {status: 500});
        }

        return NextResponse.json({success: true});
    } catch (error) {
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}