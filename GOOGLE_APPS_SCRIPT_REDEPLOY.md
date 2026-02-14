# Google Apps Script Redeployment Guide

Your current Google Apps Script URL is returning a "Page not found" error. This usually means there's an issue with the deployment. Follow these steps to fix it:

## Step 1: Check Your Google Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Open your existing project (or create a new one if needed)
3. Make sure the code from `google-apps-script/Code.gs` is properly pasted

## Step 2: Test the Script Functions

Before deploying, test the functions directly:

1. In the Google Apps Script editor, select `testSimpleEmail` from the function dropdown
2. Click the "Run" button (▶️)
3. **Grant permissions when prompted** - this is crucial!
4. Check if you receive a test email at `info@autonomousai.ae`

If the test fails:
- Check the "Executions" tab for error messages
- Make sure you've granted all permissions
- Verify the email address is correct

## Step 3: Deploy as Web App (Correctly)

1. Click "Deploy" → "New deployment"
2. Click the gear icon ⚙️ next to "Select type"
3. Choose "Web app"
4. Configure these settings **exactly**:
   - **Description**: "Contact Form Handler"
   - **Execute as**: "Me (your-email@gmail.com)"
   - **Who has access**: "Anyone"
5. Click "Deploy"

## Step 4: Handle Permissions

When you deploy, Google will ask for permissions:

1. Click "Authorize access"
2. Choose your Google account
3. You'll see a warning "Google hasn't verified this app"
4. Click "Advanced"
5. Click "Go to [Your Project Name] (unsafe)"
6. Click "Allow"

## Step 5: Get the New Web App URL

After successful deployment, you'll get a new URL that looks like:
```
https://script.google.com/macros/s/DIFFERENT_SCRIPT_ID/exec
```

**Important**: This URL will be different from your current one!

## Step 6: Update Your .env File

Replace the URL in your `.env` file with the new one from Step 5.

## Step 7: Test the New Deployment

Run this curl command with your new URL:

```bash
curl -X POST "YOUR_NEW_WEB_APP_URL" \
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

## Common Issues and Solutions

### Issue: "Script function not found"
**Solution**: Make sure you've saved the script after pasting the code

### Issue: "Authorization required"
**Solution**: 
1. Run `testSimpleEmail()` function first to grant permissions
2. Then redeploy the web app

### Issue: "Permission denied"
**Solution**: 
1. Make sure "Execute as: Me" is selected
2. Grant all requested permissions during deployment

### Issue: Still getting "Page not found"
**Solution**: 
1. Create a completely new Google Apps Script project
2. Paste the code fresh
3. Deploy with a new URL

## Alternative: Create Fresh Project

If you continue having issues:

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Delete the default code
4. Paste the entire contents of `google-apps-script/Code.gs`
5. Save the project (Ctrl+S or Cmd+S)
6. Follow the deployment steps above

## Verification Checklist

Before considering it working:

- [ ] `testSimpleEmail()` function runs without errors
- [ ] You receive a test email at `info@autonomousai.ae`
- [ ] Web app is deployed with "Execute as: Me" and "Who has access: Anyone"
- [ ] Curl test returns success JSON response
- [ ] New URL is updated in your `.env` file

## Need Help?

If you're still having issues, please share:
1. Any error messages from the "Executions" tab
2. The exact response you get from the curl test
3. Screenshots of your deployment settings