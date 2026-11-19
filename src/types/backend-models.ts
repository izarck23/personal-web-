/**
 * CoderTech — Backend Readiness Architecture Models
 * Complete TypeScript specifications for Cloud Firestore collections, Firebase Auth,
 * Cloud Storage structures, and REST / Server Function API endpoints.
 */

export type UserRole = "customer" | "admin" | "author";

export interface FirestoreUser {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  role: UserRole;
  createdAt: string; // ISO 8601
  updatedAt: string;
  purchasedProducts: string[]; // Product slugs
  downloadTokens: Record<string, string>; // slug -> active download token
}

export interface FirestoreProduct {
  id: string; // product slug (e.g. 'business-website')
  title: string;
  category: string;
  marketCategory: string;
  tier: "Free" | "Premium";
  description: string;
  longDescription: string;
  priceUSD: number;
  priceKSh: number;
  includes: string[];
  techStack: string[];
  filesIncluded: string[];
  storageZipPath: string; // gs://codertech-storage/templates/{slug}.zip
  featured: boolean;
  active: boolean;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethod = "mpesa_stk" | "mpesa_c2b" | "stripe_card" | "free_download";
export type OrderStatus = "pending" | "processing" | "completed" | "failed" | "refunded";

export interface FirestoreOrder {
  id: string; // Order ID (e.g. 'CT-9042')
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: {
    slug: string;
    title: string;
    price: number;
    currency: "USD" | "KSH";
  }[];
  totalAmount: number;
  currency: "USD" | "KSH";
  paymentMethod: PaymentMethod;
  paymentReference?: string; // M-Pesa MpesaReceiptNumber or Stripe Charge ID
  status: OrderStatus;
  downloadToken: string;
  downloadTokenExpiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface FirestoreInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  budgetRange?: string;
  timeline?: string;
  message: string;
  status: "new" | "replied" | "in_progress" | "archived";
  assignedTo?: string;
  notes?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FirestoreBlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  type: "Guide" | "Tutorial" | "Proposed workflow" | "Experiment";
  imagePath: string;
  readMinutes: number;
  published: boolean;
  publishedAt?: string;
  authorUid: string;
  authorName: string;
  contentMarkdown?: string;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FirestoreDownloadLog {
  id: string;
  productSlug: string;
  orderId?: string;
  userEmail: string;
  ipAddress: string;
  userAgent: string;
  downloadedAt: string;
  status: "granted" | "token_expired" | "unauthorized";
}

/**
 * Storage Structure:
 * gs://codertech-storage/
 * ├── templates/
 * │   ├── landing-page-template.zip
 * │   ├── startup-template.zip
 * │   ├── authentication-template.zip
 * │   ├── business-website-template.zip
 * │   ├── admin-dashboard-template.zip
 * │   └── portfolio-template-template.zip
 * ├── assets/
 * │   ├── avatars/
 * │   └── thumbnails/
 * └── reports/
 *     └── originality-scans/
 */

/**
 * API Endpoints Specifications:
 *
 * 1. POST /api/payments/mpesa/stkpush
 *    Body: { phone: string, amount: number, orderId: string, slug: string }
 *    Action: Triggers Safaricom Daraja STK Push to client device.
 *
 * 2. POST /api/payments/mpesa/callback
 *    Body: Safaricom STK Callback JSON
 *    Action: Verifies ResultCode == 0, updates FirestoreOrder status to 'completed', generates downloadToken.
 *
 * 3. POST /api/payments/stripe/create-checkout-session
 *    Body: { orderId: string, items: { slug: string, priceUSD: number }[], customerEmail: string }
 *    Action: Creates Stripe Checkout Session.
 *
 * 4. GET /api/downloads/verify?token={downloadToken}&slug={productSlug}
 *    Action: Validates downloadToken in FirestoreOrder, streams file from Firebase Storage / S3 via signed URL.
 *
 * 5. POST /api/inquiries/submit
 *    Body: FirestoreInquiry payload
 *    Action: Inserts to Firestore / Supabase and forwards email via FormSubmit or SendGrid.
 *
 * 6. POST /api/advisor/analyze
 *    Body: { prompt: string, serviceType?: string }
 *    Action: Calls @google/genai on server with isolated GEMINI_API_KEY.
 */
