# EmailJS Setup Instructions

This guide will help you configure EmailJS to send contact form submissions to info@autonomousai.ae.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set up your template with the following variables:
   - `{{to_email}}` - Recipient email (info@autonomousai.ae)
   - `{{from_name}}` - Sender's full name
   - `{{from_email}}` - Sender's email
   - `{{phone}}` - Sender's phone number
   - `{{company}}` - Sender's company name
   - `{{service}}` - Service interested in
   - `{{message}}` - Message content
   - `{{attachment_name}}` - Name of attached file (if any)

### Example Template:

**Subject:** New Contact Form Submission from {{from_name}}

**Body:**
```
You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Service Interested In: {{service}}
Attachment: {{attachment_name}}

Message:
{{message}}

---
This email was sent from the Autonomous AI contact form.
```

4. Set the **To Email** field to: `{{to_email}}`
5. Save the template and note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **Account** > **General** in the dashboard
2. Find your **Public Key** (e.g., `abcdefghijklmnop`)

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project (copy from `.env.example`)
2. Add your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual EmailJS credentials

## Step 6: Test the Form

1. Restart your development server: `npm run dev`
2. Navigate to the Contact page
3. Fill out and submit the form
4. Check info@autonomousai.ae for the email

## Important Notes

- **Free Tier Limits**: EmailJS free tier allows 200 emails per month
- **Security**: Never commit your `.env` file to version control
- **Production**: Make sure to set these environment variables in your production deployment platform
- **Email Delivery**: Emails may take a few minutes to arrive, check spam folder if needed

## Troubleshooting

- **"EmailJS configuration is missing"**: Check that your `.env` file exists and has the correct variable names
- **Email not received**: Verify your EmailJS service is connected and template is configured correctly. Also check info@autonomousai.ae spam folder
- **CORS errors**: Make sure you're using the correct public key from EmailJS dashboard

## Support

For more information, visit the [EmailJS Documentation](https://www.emailjs.com/docs/)
