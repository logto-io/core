import { Nullable } from '@silverhand/essentials';
import { z } from 'zod';

/**
 * @doc https://docs.sendgrid.com/api-reference/mail-send/mail-send#body
 */

export enum ContextType {
  'TEXT' = 'text/plain',
  'HTML' = 'text/html',
}

export type EmailData = {
  name?: string;
  email: string;
};

export type Personalization = {
  to: EmailData[];
  from?: EmailData;
  cc?: EmailData | EmailData[];
  bcc?: EmailData | EmailData[];
  subject?: string;
  headers?: Record<string, string>;
  substitutions?: Record<string, string>;
  dynamic_template_data?: Record<string, any>;
  custom_args?: Record<string, string>;
  sendAt?: number;
};

export type Content = {
  type: string; // Should either be 'text/html' or 'text/plain'.
  value: string;
};

export type Attachment = {
  content: string;
  type: string; // Should either be 'text/html' or 'text/plain'
  filename: string;
  disposition: string; // 'inline' | 'attachment'
  content_id: string; // The attachment's content ID. This is used when the disposition is set to “inline” and the attachment is an image, allowing the file to be displayed within the body of your email.
};

export type Asm = {
  group_id: number;
  groups_to_display?: number[]; // Maxitems: 25
};

export type MailSettings = {
  bypass_list_management: { enable: boolean };
  bypass_spam_management: { enable: boolean };
  bypass_bounce_management: { enable: boolean };
  bypass_unsubscribe_management: { enable: boolean };
  footer: { enable: boolean; text: string; html: string };
  sandbox_mode: { enable: boolean };
};

export type TrackingSettings = {
  click_tracking: { enable: boolean; enable_test: boolean };
  open_tracking: { enable: boolean; substitution_tag: string };
  subscription_tracking: { enable: boolean; test: string; html: string; substitution_tag: string };
  ganalytics: {
    enable: boolean;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_term: string;
    utm_content: string;
  };
};

export type PublicParameters = {
  personalizations: Personalization[];
  from: EmailData;
  reply_to?: EmailData;
  reply_to_list?: EmailData[]; // Maxitems: 1000, uniqueItems: true
  subject: string; // MinLength: 1
  content: Content[];
  attachments?: Attachment[];
  template_id?: string; // An email template ID. The template content got here will overwrite all previous content fields.
  headers?: Record<string, string>; // An object containing key/value pairs of header names and the value to substitute for them. The key/value pairs must be strings. You must ensure these are properly encoded if they contain unicode characters. These headers cannot be one of the reserved headers.
  categories?: string[]; // An array of category names for this message. Each category name may not exceed 255 characters. Maxitems: 1000, uniqueItems: true
  custom_args?: string; // This parameter is overridden by custom_args set at the personalizations level. Total custom_args size may not exceed 10,000 bytes.
  send_at?: number; // A unix timestamp.
  batch_id?: string; // An ID representing a batch of emails to be sent at the same time.
  asm?: Asm; // An object allowing you to specify how to handle unsubscribes.
  ip_pool_name?: string; // The IP Pool that you would like to send this email from. maxLength: 64, minLength: 2
  mail_settings?: MailSettings;
  tracking_settings?: TrackingSettings;
};

/**
 * UsageType here is used to specify the use case of the template, can be either
 * 'Register', 'SignIn', 'ForgotPassword' or 'Test'.
 */
const templateGuard = z.object({
  usageType: z.string(),
  type: z.nativeEnum(ContextType),
  subject: z.string(),
  content: z.string(), // With variable {{code}}, support HTML
});

export const sendGridMailConfigGuard = z.object({
  apiKey: z.string(),
  fromEmail: z.string(),
  fromName: z.string().optional(),
  templates: z.array(templateGuard),
});

export type SendGridMailConfig = z.infer<typeof sendGridMailConfigGuard>;

/**
 * @doc https://docs.sendgrid.com/api-reference/mail-send/mail-send#responses
 */
type HelpObject = Record<string, unknown>; // Helper text or docs for troubleshooting

type ErrorObject = { message: string; field?: Nullable<string>; help?: HelpObject };

export type SendEmailResponse = { errors: ErrorObject; id?: string };
