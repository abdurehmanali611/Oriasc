// app/api/contact/response/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, message, subject, title } = body;
    
    console.log('📧 Email API called with:', { to, subject, title });
    
    if (!to || !message || !subject || !title) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields: to, message, subject, title' 
        },
        { status: 400 }
      );
    }

    // Check if we're in production and have email configured
    const isProduction = process.env.NODE_ENV === 'production';
    const hasEmailConfig = process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS;

    // In development or without config, just log and return success
    if (!isProduction || !hasEmailConfig) {
      console.log('📧 [DEV/NO-CONFIG] Email would be sent:', {
        to,
        subject,
        messagePreview: message.substring(0, 100) + '...',
        title
      });
      
      return NextResponse.json({ 
        success: true, 
        devMode: true,
        message: 'Email logged (not sent in development/no config)',
        data: {
          to,
          subject,
          title
        }
      });
    }

    // Production with email config - actually send the email
    console.log('📧 [PRODUCTION] Sending email to:', to);
    
    // Create transporter using your email service
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: 'ORIASC <noreply@yourapp.com>',
      to: Array.isArray(to) ? to.join(', ') : to,
      subject: subject,
      text: message,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10b982; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .message { background-color: white; padding: 15px; border-left: 4px solid #10b982; margin: 15px 0; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Response to Your Inquiry</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>Thank you for contacting us. Here is our response:</p>
              <div class="message">
                ${message.replace(/\n/g, '<br>')}
              </div>
              <p><strong>Reference:</strong> ${title}</p>
              <p>If you have further questions, please contact us.</p>
              <div class="footer">
                <p>Sent on ${new Date().toLocaleDateString()}</p>
                <p>This is an automated response.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('📧 Email sent successfully:', info.messageId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId
    });
    
  } catch (error: any) {
    console.error('❌ Email API error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to send email',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}