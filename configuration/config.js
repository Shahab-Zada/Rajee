/**
 * RAJEE WEB APP - UNIFIED CONFIGURATION
 * Shared configuration for Next.js Web Application
 * Last Updated: December 20, 2025
 */

// ========================================
// 🌐 DOMAIN & API CONFIGURATION
// ========================================

const PRODUCTION_DOMAIN = "rajee-sa.com";
const BACKEND_URL = "https://api.rajee-sa.com";

const CONFIG = {
  // Domain Configuration
  domain: {
    main: `https://${PRODUCTION_DOMAIN}`,
    api: BACKEND_URL,
    web: `https://www.${PRODUCTION_DOMAIN}`,
  },

  // Legal & Policy URLs
  legal: {
    terms: `https://${PRODUCTION_DOMAIN}/terms`,
    privacy: `https://${PRODUCTION_DOMAIN}/privacy`,
    support: `https://${PRODUCTION_DOMAIN}/support`,
    contact: `https://${PRODUCTION_DOMAIN}/contact`,
  },

  // API Endpoints
  api: {
    baseUrl: BACKEND_URL,
    endpoints: {
      // Auth
      login: "/login",
      sendOtp: "/send-otp",
      verifyOtp: "/verify-otp",
      
      // User
      user: "/user",
      updateProfile: "/update-profile",
      
      // Content
      reportContent: "/report-content",
      blockUser: "/block-user",
      
      // Conversations
      conversations: "/conversations",
      conversation: "/conversation",
    },
  },

  // Firebase Configuration Keys (use environment variables)
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  },

  // App Information
  app: {
    name: "Rajee",
    nameAr: "راجي",
    description: "Buy and Sell Platform - Saudi Arabia",
    descriptionAr: "منصة البيع والشراء - المملكة العربية السعودية",
    version: "1.0.0",
  },

  // Features Toggle
  features: {
    enableNotifications: true,
    enableChat: true,
    enableLocation: true,
    enableVoiceSearch: true,
    enableReporting: true,
    enableBlocking: true,
    enableBundles: true,
    enableAnalytics: true,
  },

  // Social Media
  social: {
    twitter: `https://twitter.com/rajee_sa`,
    instagram: `https://instagram.com/rajee_sa`,
    facebook: `https://facebook.com/rajeesa`,
  },
};

// Helper functions
export const getApiUrl = (endpoint) => {
  return `${CONFIG.api.baseUrl}${CONFIG.api.endpoints[endpoint] || endpoint}`;
};

export const getFullUrl = (path) => {
  return `${CONFIG.domain.main}${path}`;
};

export default CONFIG;
