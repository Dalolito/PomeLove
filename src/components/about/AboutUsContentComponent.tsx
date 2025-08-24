'use client';

import { Dictionary } from '@/lib/types/dictionary';
import AboutUsHeroSectionComponent from '@/components/about/AboutUsHeroSectionComponent';
import AboutUsHappyClientsComponent from '@/components/about/AboutUsHappyClientsComponent';
import AboutUsExperienceComponent from '@/components/about/AboutUsExperienceComponent';
import AboutUsBreedingComponent from '@/components/about/AboutUsBreedingComponent';
import AboutUsCertificationsComponent from '@/components/about/AboutUsCertificationsComponent';
import AboutUsExportsComponent from '@/components/about/AboutUsExportsComponent';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AboutUsContentProps {
  dict: Dictionary;
  locale: string;
}

export default function AboutUsContentComponent({
  dict,
  locale,
}: AboutUsContentProps) {
  useScrollAnimation();

  return (
    <div className="w-full">
      <AboutUsHeroSectionComponent dict={dict} locale={locale} />
      <AboutUsHappyClientsComponent dict={dict} locale={locale} />
      <AboutUsExperienceComponent dict={dict} locale={locale} />
      <AboutUsBreedingComponent dict={dict} locale={locale} />
      <AboutUsCertificationsComponent dict={dict} locale={locale} />
      <AboutUsExportsComponent dict={dict} locale={locale} />
    </div>
  );
}
