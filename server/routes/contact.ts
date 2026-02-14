import { RequestHandler } from "express";

export const handleContact: RequestHandler = async (req, res) => {
  try {
    const { fullName, email, phone, company, service, message, to } = req.body;

    // Here you would integrate with an email service like SendGrid, Nodemailer, etc.
    // For now, we'll log the data and return success
    console.log('Contact form submission:', {
      to,
      from: email,
      fullName,
      phone,
      company,
      service,
      message
    });

    // TODO: Implement actual email sending
    // Example with nodemailer:
    // await transporter.sendMail({
    //   from: email,
    //   to: to,
    //   subject: `New Contact Form Submission from ${fullName}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${fullName}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
    //     <p><strong>Company:</strong> ${company || 'N/A'}</p>
    //     <p><strong>Service:</strong> ${service}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `
    // });

    res.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ success: false, message: 'Failed to submit form' });
  }
};
