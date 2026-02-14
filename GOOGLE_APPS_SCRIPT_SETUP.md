# Google Apps Script Email Setup Guide

This guide will help you set up Google Apps Script to handle contact form submissions from your React app.

## Step 1: Create a New Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Replace the default `Code.gs` content with the code from `google-apps-script/Code.gs`
4. Save the project with a meaningful name like "Autonomous AI Contact Form"

## Step 2: Configure Email Settings

1. Open the `Code.gs` file in your Google Apps Script project
2. Update the `TO_EMAIL` constant in the `sendContactEmail` function:
   ```javascript
   const TO_EMAIL = 'info@autonomousai.ae'; // Change to your actual email
   ```

## Step 3: Deploy as Web App

1. In Google Apps Script, click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following configuration:
   - **Description**: "Contact Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click "Deploy"
5. **Important**: Copy the Web App URL - you'll need this for your React app

## Step 4: Grant Permissions

1. When you first deploy, Google will ask for permissions
2. Click "Review permissions"
3. Choose your Google account
4. Click "Advanced" → "Go to [Your Project Name] (unsafe)"
5. Click "Allow"

## Step 5: Test the Deployment

1. In Google Apps Script, go to the "Executions" tab
2. Run the `testEmailFunction()` to verify email sending works
3. Check your email to confirm the test message was received

## Step 6: Update Your React App

The Web App URL from Step 3 will be used in your React contact form. It should look like:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Security Notes

- The script runs under your Google account permissions
- Only you can modify the script code
- The web app is publicly accessible but only accepts POST requests with valid data
- Consider adding additional validation or rate limiting if needed

## Troubleshooting

### Common Issues:

1. **"Script function not found"**: Make sure you've saved the script after pasting the code
2. **Permission denied**: Re-run the deployment process and grant all requested permissions
3. **Email not sending**: Check the "Executions" tab for error logs
4. **CORS errors**: Google Apps Script automatically handles CORS for web apps

### Testing:

You can test the endpoint using curl:
```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

## Email Quotas

Google Apps Script has email quotas:
- **Free accounts**: 100 emails per day
- **Google Workspace accounts**: 1,500 emails per day

For higher volume, consider upgrading to Google Workspace or using a dedicated email service.