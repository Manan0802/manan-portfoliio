import React from 'react';
import { About } from '../About/About';
import { ProofStrip } from './ProofStrip';
import { FeaturedCase } from './FeaturedCase';
import { WorkWithMe } from './WorkWithMe';
import { ClosingCta } from './ClosingCta';

// Everything under the hero. Loaded as a separate chunk (see HomePage) so the hero paints first.
const HomeBody: React.FC = () => (
  <>
    <ProofStrip />
    <FeaturedCase />
    <About />
    <WorkWithMe />
    <ClosingCta />
  </>
);

export default HomeBody;
