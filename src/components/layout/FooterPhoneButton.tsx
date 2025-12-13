'use client';

export default function FooterPhoneButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion();
    }
    window.open('https://wa.me/573004439574', '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="text-left transition-colors hover:text-white"
    >
      +57 300 443 9574
    </button>
  );
}
