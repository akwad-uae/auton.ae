/**
 * Google Apps Script for handling contact form submissions
 * Deploy this as a web app and use the URL in your React app
 */

// Configuration - Update these email addresses as needed
const CONFIG = {
  // Primary recipient (where form submissions go)
  PRIMARY_EMAIL: 'info@autonomousai.ae',
  
  // Additional recipients (optional - add more emails here if needed)
  CC_EMAILS: [
    'info@autonomousai.ae' // You can add more emails here: 'admin@autonomousai.ae', 'support@autonomousai.ae'
  ],
  
  // Email settings
  TIMEZONE: 'Asia/Dubai',
  COMPANY_NAME: 'Autonomous AI'
};

function doPost(e) {
  try {
    console.log('Received POST request');
    console.log('Request data:', e.postData.contents);
    
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed data:', JSON.stringify(data));
    
    // Validate required fields
    if (!data.fullName || !data.email || !data.message) {
      console.error('Missing required fields:', { 
        fullName: !!data.fullName, 
        email: !!data.email, 
        message: !!data.message 
      });
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Missing required fields'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Send email
    console.log('Attempting to send email...');
    const emailSent = sendContactEmail(data);
    console.log('Email send result:', emailSent);
    
    if (emailSent) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Email sent successfully',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Failed to send email'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    console.error('Error processing request:', error);
    console.error('Error stack:', error.stack);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Internal server error: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendContactEmail(data) {
  try {
    console.log('Starting email send process...');
    console.log('Email config:', CONFIG);
    
    const SUBJECT = `New Contact Form Submission from ${data.fullName}`;
    console.log('Email subject:', SUBJECT);
    
    // Create email body
    const emailBody = `
New contact form submission received:

Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Service: ${data.service || 'Not specified'}

Message:
${data.message}

${data.attachment ? `Attachment: ${data.attachment.name}` : 'No attachment'}

---
This email was sent from the ${CONFIG.COMPANY_NAME} contact form.
Submitted on: ${new Date().toLocaleString('en-US', { timeZone: CONFIG.TIMEZONE })} (UAE Time)
    `.trim();
    
    console.log('Email body prepared, length:', emailBody.length);
    
    // Prepare email options
    const emailOptions = {
      to: CONFIG.PRIMARY_EMAIL,
      subject: SUBJECT,
      body: emailBody,
      replyTo: data.email
    };
    
    // Add CC recipients if there are any additional emails
    if (CONFIG.CC_EMAILS && CONFIG.CC_EMAILS.length > 0) {
      emailOptions.cc = CONFIG.CC_EMAILS.join(',');
      console.log('CC recipients:', emailOptions.cc);
    }
    
    console.log('Email options:', JSON.stringify(emailOptions, null, 2));
    
    // Send the email
    console.log('Calling MailApp.sendEmail...');
    MailApp.sendEmail(emailOptions);
    console.log('MailApp.sendEmail completed successfully');
    
    // Log the submission for tracking
    console.log(`Contact form submission from ${data.fullName} (${data.email}) sent to ${CONFIG.PRIMARY_EMAIL}`);
    if (CONFIG.CC_EMAILS && CONFIG.CC_EMAILS.length > 0) {
      console.log(`CC sent to: ${CONFIG.CC_EMAILS.join(', ')}`);
    }
    
    // Send confirmation email to the user
    console.log('Sending confirmation email...');
    sendConfirmationEmail(data);
    console.log('Confirmation email process completed');
    
    return true;
  } catch (error) {
    console.error('Error in sendContactEmail:', error);
    console.error('Error stack:', error.stack);
    return false;
  }
}

function sendConfirmationEmail(data) {
  try {
    const SUBJECT = `Thank you for contacting ${CONFIG.COMPANY_NAME}`;
    
    const confirmationBody = `
Dear ${data.fullName},

Thank you for reaching out to ${CONFIG.COMPANY_NAME}. We have received your message and will get back to you within 24 hours.

Here's a summary of your submission:
- Service of Interest: ${data.service || 'Not specified'}
- Company: ${data.company || 'Not provided'}

We appreciate your interest in our AI solutions and look forward to discussing how we can help your business.

Best regards,
The ${CONFIG.COMPANY_NAME} Team

---
This is an automated confirmation email. Please do not reply to this message.
If you need immediate assistance, please contact us at ${CONFIG.PRIMARY_EMAIL}
    `.trim();
    
    MailApp.sendEmail({
      to: data.email,
      subject: SUBJECT,
      body: confirmationBody
    });
    
    console.log(`Confirmation email sent to ${data.email}`);
    
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

// Test function for development
function testEmailFunction() {
  console.log('Starting email test...');
  
  const testData = {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '+971 50 123 4567',
    company: 'Test Company',
    service: 'AI-Enabled Software Services',
    message: 'This is a test message from Google Apps Script.',
    attachment: null
  };
  
  console.log('Test data:', JSON.stringify(testData, null, 2));
  
  const result = sendContactEmail(testData);
  console.log('Test email result:', result);
  
  if (result) {
    console.log('✅ Test email sent successfully!');
  } else {
    console.log('❌ Test email failed!');
  }
  
  return result;
}

// Simple test to check if MailApp works
function testSimpleEmail() {
  try {
    console.log('Testing simple email...');
    
    MailApp.sendEmail({
      to: CONFIG.PRIMARY_EMAIL,
      subject: 'Google Apps Script Test Email',
      body: 'This is a simple test email to verify MailApp is working.\n\nSent at: ' + new Date().toString()
    });
    
    console.log('✅ Simple email sent successfully!');
    return true;
  } catch (error) {
    console.error('❌ Simple email failed:', error);
    return false;
  }
}

// Test function to check email quota
function checkEmailQuota() {
  try {
    const quota = MailApp.getRemainingDailyQuota();
    console.log('Remaining daily email quota:', quota);
    return quota;
  } catch (error) {
    console.error('Error checking email quota:', error);
    return null;
  }
}