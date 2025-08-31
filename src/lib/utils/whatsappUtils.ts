import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import { trackWhatsAppContact } from '@/lib/utils/analyticsUtils';
import { replaceText } from '@/lib/utils/textUtils';

export function openWhatsAppContact(
  puppy: Puppy,
  dict: Dictionary,
  locale: string = 'es'
): void {
  trackWhatsAppContact(puppy.name);

  try {
    const message = generateWhatsAppMessage(puppy, dict, locale);
    const whatsappUrl = buildWhatsAppUrl(message);

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Error opening WhatsApp:', error);
    window.open('https://wa.me/573004439574', '_blank', 'noopener,noreferrer');
  }
}

function generateWhatsAppMessage(
  puppy: Puppy,
  dict: Dictionary,
  locale: string
): string {
  const messageTemplate = puppy.available
    ? dict.whatsapp?.messageTemplate ||
      dict.whatsapp?.basicMessage ||
      dict.utils.errors.unexpected
    : dict.whatsapp?.messageTemplateUnavailable ||
      dict.whatsapp?.messageTemplate ||
      dict.whatsapp?.basicMessage ||
      dict.utils.errors.unexpected;

  const genderText = dict.admin.forms.gender[puppy.gender] || puppy.gender;

  return replaceText(messageTemplate, {
    puppyName: puppy.name,
    category: puppy.category.name,
    gender: genderText,
  });
}

function buildWhatsAppUrl(message: string): string {
  const phoneNumber = '573004439574';
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function openBasicWhatsAppContact(dict: Dictionary): void {
  trackWhatsAppContact();

  const basicMessage =
    dict.whatsapp?.basicMessage || dict.utils.errors.unexpected;
  const whatsappUrl = buildWhatsAppUrl(basicMessage);

  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}
