const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendQuoteRequest = async (req, res) => {
    try {
        console.log('Quote request received:');
        console.log('Request body:', req.body);
        console.log('Request headers:', req.headers);
        
        const { name, email, phone, company, description, fileLinks } = req.body;

        if (!name || !email || !description) {
            console.log('Missing required fields:', { name: !!name, email: !!email, description: !!description });
            return res.status(400).json({ 
                success: false, 
                message: 'Please fill in all required fields (Name, Email, and Project Description)' 
            });
        }

        // Log file upload information
        console.log('Files uploaded:', fileLinks ? fileLinks.length : 0);
        if (fileLinks && fileLinks.length > 0) {
            console.log('File links:', fileLinks);
        }

        
        const companyEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #007AFF;">New Quote Request - ACCU Design</h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="color: #333; margin-bottom: 15px;">Customer Details</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                </div>
                
                <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="color: #333; margin-bottom: 15px;">Project Description</h3>
                    <p style="white-space: pre-wrap;">${description}</p>
                </div>

                ${fileLinks && fileLinks.length > 0 ? `
                <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #333; margin-bottom: 15px;">Uploaded Files</h3>
                    <ul>
                        ${fileLinks.map((link, index) => `<li><a href="${link}" target="_blank">File ${index + 1}</a></li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                    <p style="color: #666; font-size: 14px;">
                        This email was sent from your ACCU Design website contact form.
                    </p>
                </div>
            </div>
        `;

        
        const customerEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #007AFF; margin-bottom: 10px;">
                        <span style="color: #007AFF;">ACCU</span> DESIGN
                    </h1>
                    <p style="color: #666;">Precision Engineering Solutions</p>
                </div>

                <h2 style="color: #333;">Thank You for Your Quote Request!</h2>
                
                <p>Dear ${name},</p>
                
                <p>Thank you for reaching out to ACCU Design. We have received your quote request and our team will review your project requirements carefully.</p>
                
                <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #007AFF; margin-bottom: 15px;">What happens next?</h3>
                    <ul style="color: #333; line-height: 1.8;">
                        <li>Our engineering team will analyze your project requirements</li>
                        <li>We'll prepare a detailed, customized quote for your project</li>
                        <li>You'll receive our response within 24-48 business hours</li>
                        <li>We may contact you for any clarifications if needed</li>
                    </ul>
                </div>

                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #333; margin-bottom: 15px;">Your Request Summary</h3>
                    <p><strong>Company:</strong> ${company || 'Not specified'}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                </div>

                <p>If you have any urgent questions, please don't hesitate to contact us directly:</p>
                <ul>
                    <li><strong>Email:</strong> projects@accudesign.in</li>
                    <li><strong>Phone:</strong> +91-9821679475</li>
                </ul>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
                    <p style="color: #666; font-size: 14px; margin-bottom: 10px;">Best regards,</p>
                    <p style="color: #007AFF; font-weight: bold;">The ACCU Design Team</p>
                    <p style="color: #666; font-size: 12px; margin-top: 20px;">
                        Shop No. 30/15, Unity Industrial Estate, Saidham Road, Dhayari, Pune, Maharashtra 411041
                    </p>
                </div>
            </div>
        `;

        
        await resend.emails.send({
            from: 'ACCU Design contact@technewity.com', 
            to: ['projects@accudesign.in'],
            subject: `New Quote Request from ${name}`,
            html: companyEmailHtml,
        });

        
        await resend.emails.send({
            from: 'ACCU Design contact@technewity.com',
            to: [email],
            subject: 'Thank you for your quote request - ACCU Design',
            html: customerEmailHtml,
        });

        res.status(200).json({
            success: true,
            message: 'Quote request sent successfully! We will get back to you within 24-48 hours.'
        });

    } catch (error) {
        console.error('Error sending quote request email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send quote request. Please try again or contact us directly.',
            error: error.message
        });
    }
};

const sendContactEmail = async (req, res) => {
    try {
        const { name, email, subject, message, phone } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please fill in all required fields' 
            });
        }

        
        const contactEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #007AFF;">New Contact Form Submission - ACCU Design</h2>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="color: #333; margin-bottom: 15px;">Contact Details</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                </div>
                
                <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h3 style="color: #333; margin-bottom: 15px;">Message</h3>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                    <p style="color: #666; font-size: 14px;">
                        This email was sent from your ACCU Design website contact form.
                    </p>
                </div>
            </div>
        `;

        
        const thankYouEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #007AFF; margin-bottom: 10px;">
                        <span style="color: #007AFF;">ACCU</span> DESIGN
                    </h1>
                    <p style="color: #666;">Precision Engineering Solutions</p>
                </div>

                <h2 style="color: #333;">Thank You for Contacting Us!</h2>
                
                <p>Dear ${name},</p>
                
                <p>Thank you for reaching out to ACCU Design. We have received your message and will respond to your inquiry as soon as possible.</p>
                
                <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #007AFF; margin-bottom: 15px;">Your Message</h3>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p style="margin-top: 15px; white-space: pre-wrap;">${message}</p>
                </div>

                <p>Our team typically responds within 24 hours during business days. For urgent matters, please call us directly at +91-9821679475.</p>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
                    <p style="color: #666; font-size: 14px; margin-bottom: 10px;">Best regards,</p>
                    <p style="color: #007AFF; font-weight: bold;">The ACCU Design Team</p>
                </div>
            </div>
        `;

        // Send emails
        await resend.emails.send({
            from: 'ACCU Design contact@technewity.com',
            to: ['projects@accudesign.in'],
            subject: `Contact Form: ${subject}`,
            html: contactEmailHtml,
        });

        await resend.emails.send({
            from: 'ACCU Design contact@technewity.com', 
            to: [email],
            subject: 'Thank you for contacting ACCU Design',
            html: thankYouEmailHtml,
        });

        res.status(200).json({
            success: true,
            message: 'Message sent successfully! We will get back to you soon.'
        });

    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again or contact us directly.',
            error: error.message
        });
    }
};


const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email address is required' 
            });
        }

        
        const welcomeEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #007AFF; margin-bottom: 10px;">
                        <span style="color: #007AFF;">ACCU</span> DESIGN
                    </h1>
                    <p style="color: #666;">Precision Engineering Solutions</p>
                </div>

                <h2 style="color: #333;">Welcome to ACCU Design Newsletter!</h2>
                
                <p>Thank you for subscribing to our newsletter. You'll now receive updates about:</p>
                
                <ul style="color: #333; line-height: 1.8;">
                    <li>Latest manufacturing technologies and techniques</li>
                    <li>New services and capabilities</li>
                    <li>Industry insights and trends</li>
                    <li>Special offers and promotions</li>
                    <li>Company news and updates</li>
                </ul>

                <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                    <h3 style="color: #007AFF; margin-bottom: 15px;">Get in Touch</h3>
                    <p>Have a project in mind? We'd love to help!</p>
                    <a href="mailto:projects@accudesign.in" style="background-color: #007AFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px;">
                        Contact Us
                    </a>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
                    <p style="color: #007AFF; font-weight: bold;">The ACCU Design Team</p>
                    <p style="color: #666; font-size: 12px; margin-top: 20px;">
                        Shop No. 30/15, Unity Industrial Estate, Saidham Road, Dhayari, Pune, Maharashtra 411041
                    </p>
                </div>
            </div>
        `;

        
        const notificationEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #007AFF;">New Newsletter Subscription - ACCU Design</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
        `;

        
        await resend.emails.send({
            from: 'ACCU Design contact@technewity.com', 
            to: [email],
            subject: 'Welcome to ACCU Design Newsletter!',
            html: welcomeEmailHtml,
        });

        await resend.emails.send({
            from: 'ACCU Design contact@technewity.com', 
            to: ['projects@accudesign.in'],
            subject: 'New Newsletter Subscription',
            html: notificationEmailHtml,
        });

        res.status(200).json({
            success: true,
            message: 'Successfully subscribed to newsletter!'
        });

    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to subscribe. Please try again.',
            error: error.message
        });
    }
};

module.exports = {
    sendQuoteRequest,
    sendContactEmail,
    subscribeNewsletter
};