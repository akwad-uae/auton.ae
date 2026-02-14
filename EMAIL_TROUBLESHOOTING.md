# Email Troubleshooting Guide

If you're not receiving emails from the contact form, follow these steps to diagnose and fix the issue.

## Step 1: Test Google Apps Script Directly

1. Open your Google Apps Script project
2. Run the `testSimpleEmail()` function:
   - Click on the function name in the editor
   - Click the "Run" button (▶️)
   - Check if you receive a test email at `info@autonomousai.ae`

3. If the simple test fails:
   - Check the "Executions" tab for error messages
   - Verify you've granted all necessary permissions
   - Make sure your Google account can send emails

## Step 2: Check Email Quota

1. Run the `checkEmailQuota()` function in Google Apps Script
2. Verify you have remaining email quota:
   - Free accounts: 100 emails/day
   - Google Workspace: 1,500 emails/day

## Step 3: Verify Web App Deployment

1. In Google Apps Script, go to "Deploy" → "Manage deployments"
2. Ensure your web app is deployed with:
   - **Execute as**: "Me" (your account)
   - **Who has access**: "Anyone"
3. Copy the Web App URL and verify it's in your `.env` file

## Step 4: Test the Web App Endpoint

Test your deployed web app using curl or a tool like Postman:

```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Email sent successfully",
  "timestamp": "2024-02-02T..."
}
```

## Step 5: Check Email Delivery Issues

### Gmail/Google Workspace Users:
1. Check your **Spam/Junk** folder
2. Check **All Mail** folder
3. Look for emails from your own Google account

### Other Email Providers:
1. Check spam/junk folders
2. Verify the email address `info@autonomousai.ae` exists and can receive emails
3. Check if your email provider blocks automated emails

## Step 6: Debug with Console Logs

1. In Google Apps Script, go to "Executions" tab
2. Click on recent executions to see detailed logs
3. Look for error messages or failed steps

## Step 7: Common Issues and Solutions

### Issue: "Script function not found"
**Solution**: Make sure you've saved the script after pasting the code

### Issue: "Permission denied"
**Solution**: 
1. Re-deploy the web app
2. Grant all requested permissions
3. Make sure "Execute as: Me" is selected

### Issue: "Invalid email address"
**Solution**: Verify `info@autonomousai.ae` is a valid, active email address

### Issue: "Quota exceeded"
**Solution**: 
1. Wait until the next day (quota resets at midnight Pacific Time)
2. Consider upgrading to Google Workspace for higher limits

### Issue: "CORS error" in browser
**Solution**: Google Apps Script automatically handles CORS for web apps - this shouldn't occur

## Step 8: Alternative Email Configuration

If `info@autonomousai.ae` continues to have issues, try temporarily changing the email to a Gmail address you control:

1. In Google Apps Script, update the CONFIG:
   ```javascript
   const CONFIG = {
     PRIMARY_EMAIL: 'your-gmail@gmail.com', // Temporary test email
     // ... rest of config
   };
   ```

2. Test if emails arrive at the Gmail address
3. If successful, the issue is with the `info@autonomousai.ae` email address

## Step 9: Enable Detailed Logging

The updated script now includes detailed console logging. After submitting a form:

1. Go to Google Apps Script → "Executions"
2. Click on the latest execution
3. Review all console logs to see exactly where the process fails

## Step 10: Contact Form Frontend Check

Verify your React app is correctly configured:

1. Check `.env` file has the correct `VITE_GOOGLE_APPS_SCRIPT_URL`
2. Open browser developer tools when submitting the form
3. Check the Network tab for the POST request to Google Apps Script
4. Verify the request payload contains all required fields

## Need More Help?

If none of these steps resolve the issue, please share:
1. The exact error messages from Google Apps Script "Executions" tab
2. The response you get when testing the web app with curl
3. Whether the simple email test (`testSimpleEmail()`) works
4. Your current Google Apps Script configuration