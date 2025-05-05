
/**
 * Email Service - Simulates sending emails with OTP codes
 * 
 * In a production environment, this would integrate with a real email service
 * like SendGrid, Mailgun, AWS SES, etc., through a secure backend.
 */

// Generate a random 6-digit OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTPs temporarily (in a real app, this would be in a database with expiration)
const otpStorage: Record<string, { otp: string; expiry: number }> = {};

// Send OTP to email (simulation)
export const sendOTPEmail = async (email: string): Promise<string> => {
  // Generate a new OTP
  const otp = generateOTP();
  
  // Store OTP with 10-minute expiration
  const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes
  otpStorage[email] = { otp, expiry: expiryTime };
  
  // In a real implementation, this would send an actual email
  console.log(`Sending OTP ${otp} to ${email}`);
  
  // Here we would call an email service API
  // For demo purposes, we'll just log it and return the OTP
  
  /* 
   * Example API call to email service (commented out):
   * 
   * await fetch('https://api.emailservice.com/send', {
   *   method: 'POST',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': `Bearer ${API_KEY}`
   *   },
   *   body: JSON.stringify({
   *     to: email,
   *     subject: 'Your IES FESTHIVE Verification Code',
   *     html: `<p>Your verification code is: <strong>${otp}</strong></p><p>This code will expire in 10 minutes.</p>`
   *   })
   * });
   */
  
  return otp;
};

// Verify OTP for a given email
export const verifyOTP = (email: string, submittedOtp: string): boolean => {
  const storedData = otpStorage[email];
  
  // Check if OTP exists and hasn't expired
  if (storedData && Date.now() < storedData.expiry) {
    const isValid = storedData.otp === submittedOtp;
    
    // If valid, remove the OTP (one-time use)
    if (isValid) {
      delete otpStorage[email];
    }
    
    return isValid;
  }
  
  return false;
};
