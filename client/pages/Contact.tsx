import Layout from "@/components/Layout";
import { useState, FormEvent } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    attachment: null as File | null,
    agreeToPolicy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    "AI-Enabled Software Services",
    "AI Infrastructure & Data Services",
    "AI-Powered Business Evolution",
    "Emerging Innovations",
    "Training and Enablement",
    "AI Solutions Execution Process",
    "Computer Vision",
    "Natural Language Processing",
    "Other",
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Get Google Apps Script URL from environment variables
    const gasUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

    if (!gasUrl) {
      console.error('Google Apps Script URL is missing. Please check your .env file.');
      console.error('Expected: VITE_GOOGLE_APPS_SCRIPT_URL in .env file');
      setSubmitStatus('error');
      return;
    }

    console.log('Starting form submission...');
    console.log('Google Apps Script URL:', gasUrl);

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare data for Google Apps Script
      const formPayload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || '',
        company: formData.company || '',
        service: formData.service || '',
        message: formData.message,
        attachment: formData.attachment ? {
          name: formData.attachment.name,
          size: formData.attachment.size
        } : null
      };

      console.log('Form payload:', formPayload);

      // Send data to Google Apps Script
      console.log('Sending request to Google Apps Script...');
      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload)
      });

      console.log('Response received. Status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Log detailed response for debugging
      console.log('Google Apps Script response:', result);

      if (result.success) {
        console.log('✅ Email sent successfully via Google Apps Script!');
        setSubmitStatus('success');
        
        // Reset form after successful submission
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
          attachment: null,
          agreeToPolicy: false,
        });
      } else {
        console.error('❌ Google Apps Script returned error:', result.error);
        throw new Error(result.error || 'Failed to send email');
      }

    } catch (error) {
      console.error('❌ Failed to send email:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      console.log('Form submission completed');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      // 10MB limit
      setFormData({ ...formData, attachment: file });
    } else {
      alert("File size must be less than 10MB");
    }
  };

  return (
    <Layout>
      <section className="section py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide uppercase mb-6">
              <span className="text-primary">LET'S CREATE SOMETHING SMART</span>
            </h1>
            <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto">
              Please Fill In Your Details Below — Our Team Will Get Back
              <br />
              To You Within 24 Hours.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Full Name */}
            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-white text-sm md:text-base tracking-wide uppercase">
                FULL NAME <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter your Name"
                className="bg-[#1A1A1A] border border-white/10 rounded-lg px-6 py-4 text-white/60 placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Work Email */}
            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-white text-sm md:text-base tracking-wide uppercase">
                WORK EMAIL <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your Email Address"
                className="bg-[#1A1A1A] border border-white/10 rounded-lg px-6 py-4 text-white/60 placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-white text-sm md:text-base tracking-wide uppercase">
                PHONE NUMBER
                <br />
                <span className="text-white/60 text-xs">(OPTIONAL)</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter your Phone Number"
                className="bg-[#1A1A1A] border border-white/10 rounded-lg px-6 py-4 text-white/60 placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Company Name */}
            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-white text-sm md:text-base tracking-wide uppercase">
                COMPANY NAME
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                placeholder="Enter your Company Name"
                className="bg-[#1A1A1A] border border-white/10 rounded-lg px-6 py-4 text-white/60 placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Service Interested In */}
            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-white text-sm md:text-base tracking-wide uppercase">
                SERVICE
                <br />
                INTERESTED IN
              </label>
              <div className="relative">
                <select
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-6 py-4 text-white/60 focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select Service that you're Interested</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service.toUpperCase()}
                    </option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Project Details / Message */}
            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-start">
              <label className="text-white text-sm md:text-base tracking-wide uppercase pt-4">
                PROJECT DETAILS / MESSAGE <span className="text-primary">*</span>
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="WRITE YOUR MESSAGE"
                rows={6}
                className="bg-[#1A1A1A] border border-white/10 rounded-lg px-6 py-4 text-white/60 placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>

            {/* Attachment */}
            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-white text-sm md:text-base tracking-wide uppercase">
                ATTACHMENT
                <br />
                <span className="text-white/60 text-xs">(OPTIONAL)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-between bg-[#1A1A1A] border border-white/10 rounded-lg px-6 py-4 cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <span className="text-white/30 text-sm">
                    {formData.attachment
                      ? formData.attachment.name
                      : "MAX 10MB"}
                  </span>
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </label>
              </div>
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start gap-4 pt-8">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="privacy-policy"
                  required
                  checked={formData.agreeToPolicy}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeToPolicy: e.target.checked })
                  }
                  className="w-6 h-6 bg-transparent border-2 border-white/30 rounded appearance-none cursor-pointer checked:bg-primary checked:border-primary transition-colors"
                />
                <svg
                  className={`absolute left-1 top-1 w-4 h-4 text-white pointer-events-none transition-opacity ${
                    formData.agreeToPolicy ? "opacity-100" : "opacity-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <label
                htmlFor="privacy-policy"
                className="text-white/60 text-sm cursor-pointer"
              >
                I Agree To The Privacy Policy And To Be Contacted By Autonomous AI
              </label>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-green-400 text-center">
                <p className="text-sm">✓ Message sent successfully! We'll get back to you within 24 hours.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-400 text-center">
                <p className="text-sm">✗ Failed to send message. Please try again or contact us directly at info@autonomousai.ae</p>
                <p className="text-xs mt-2 opacity-75">Check the browser console for more details</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center md:justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !formData.agreeToPolicy}
                className={`border rounded-lg px-12 py-4 text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
                  isSubmitting || !formData.agreeToPolicy
                    ? 'bg-gray-800 border-gray-600 text-gray-500 cursor-not-allowed'
                    : 'bg-transparent border-white/30 text-white hover:border-primary/50 hover:bg-white/5'
                }`}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
              
              {/* Helper text when button is disabled */}
              {!formData.agreeToPolicy && !isSubmitting && (
                <div className="ml-4 flex items-center text-white/40 text-xs">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Please agree to the privacy policy
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
