const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendQuoteRequest = async (req, res) => {
  try {
    const { name, email, phone, company, description, fileLinks } = req.body;

    if (!name || !email || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, Description)',
      });
    }

    // 📩 Email to company
    const companyEmailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color:#333;">📌 New Quote Request - ACCU Design</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
        ${
          fileLinks?.length
            ? `<p><strong>Files:</strong></p><ul>${fileLinks
                .map((f) => `<li><a href="${f.link}" target="_blank">${f.name}</a></li>`)
                .join('')}</ul>`
            : '<p>No files uploaded</p>'
        }
      </div>
    `;

    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'ACCU Design <contact@technewity.com>',
      to: ['projects@accudesign.in'],
      subject: `New Quote Request from ${name}`,
      html: companyEmailHtml,
    });

    // 📩 Confirmation email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color:#007bff;">✅ Quote Request Confirmation</h2>
        <p>Hello ${name},</p>
        <p>Thank you for submitting your quote request. We have received your project details and our team will get back to you within <strong>24–48 hours</strong>.</p>

        <h3 style="margin-top:20px;">📌 Your Request Details:</h3>
        <p><strong>Description:</strong></p>
        <p>${description}</p>

        ${
          fileLinks?.length
            ? `<p><strong>Your Uploaded Files:</strong></p><ul>${fileLinks
                .map((f) => `<li><a href="${f.link}" target="_blank">${f.name}</a></li>`)
                .join('')}</ul>`
            : ''
        }

        <p style="margin-top:20px;">Best regards,<br/>ACCU Design Team</p>
        <hr style="margin:20px 0; border:1px solid #eee;" />
        <p style="color:#666; font-size:12px;">This is an automated confirmation email. Please do not reply directly.</p>
      </div>
    `;

    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'ACCU Design <contact@technewity.com>',
      to: [email],
      subject: 'We received your quote request - ACCU Design',
      html: customerEmailHtml,
    });

    return res.status(200).json({
      success: true,
      message: 'Quote request and confirmation email sent successfully!',
    });
  } catch (error) {
    console.error('Error in sendQuoteRequest:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send quote request',
      error: error.message,
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
      <h2>New Contact Form Submission - ACCU Design</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `;

    const thankYouEmailHtml = `
      <p>Dear ${name},</p>
      <p>Thank you for contacting ACCU Design. We have received your message and will respond as soon as possible.</p>
      <p>Best regards, <br/>ACCU Design Team</p>
    `;

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

    res.status(200).json({ success: true, message: 'Message sent successfully! We will get back to you soon.' });

  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.', error: error.message });
  }
};

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    const welcomeEmailHtml = `
      <h2>Welcome to ACCU Design Newsletter!</h2>
      <p>Thank you for subscribing! You'll receive updates on our services, news, and special offers.</p>
    `;

    const notificationEmailHtml = `
      <h2>New Newsletter Subscription - ACCU Design</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
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

    res.status(200).json({ success: true, message: 'Successfully subscribed to newsletter!' });

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ success: false, message: 'Failed to subscribe.', error: error.message });
  }
};

module.exports = {
  sendQuoteRequest,
  sendContactEmail,
  subscribeNewsletter
};
