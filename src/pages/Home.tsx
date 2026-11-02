import React from 'react';
import { Hero } from '../components/home/Hero';
import { BrandStatement } from '../components/home/BrandStatement';
import { SelectedWorks } from '../components/home/SelectedWorks';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { ImpactStrip } from '../components/home/ImpactStrip';
import { StudioMoment } from '../components/home/StudioMoment';
import { Testimonials } from '../components/home/Testimonials';
import { LatestWork } from '../components/home/LatestWork';
import { ClosingCta } from '../components/ClosingCta';

export function Home() {
  return (
    <main>
      <Hero />
      <BrandStatement />
      <SelectedWorks />
      <ServicesPreview />
      <ImpactStrip />
      <StudioMoment />
      <Testimonials />
      <LatestWork />
      <ClosingCta />
    </main>);

}