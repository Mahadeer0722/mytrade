import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    console.log('API Route hit: /api/contact');

    const data = await request.json();
    const { firstName, lastName, phone, subject, message } = data;

    // Debug logging (Masked password)
    const emailUser = process.env.EMAIL_USER || 'agrandhaja@gmail.com';
    const emailPass = process.env.EMAIL_PASSWORD;
    console.log(`Using Email User: ${emailUser}`);
    console.log(`Email Password Set: ${emailPass ? 'YES (Length: ' + emailPass.length + ')' : 'NO'}`);

    // Configure transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: emailUser,
            pass: emailPass,
        },
    });

    const mailOptions = {
        from: emailUser,
        to: 'gtcgarndtradingcompany@gmail.com', // Send to owner
        subject: `New Order: ${subject}`,
        text: `
      Name: ${firstName} ${lastName}
      Phone: ${phone}
      
      Message:
      ${message}
    `,
    };

    try {
        if (!emailPass) {
            console.error("ERROR: No EMAIL_PASSWORD environment variable found.");
            return NextResponse.json({ error: 'Server misconfiguration: Missing email password' }, { status: 500 });
        }

        console.log('Attempting to send mail...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Email sending error details:', error);
        return NextResponse.json({ error: 'Failed to send email: ' + error.message }, { status: 500 });
    }
}
