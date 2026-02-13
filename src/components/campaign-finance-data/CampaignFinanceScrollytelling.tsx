import React from 'react';
import ScrollytellingWrapper from '../scrollytelling/ScrollytellingWrapper';
import StickyVisualization from './StickyVisualization';
import NarrativeSteps from './NarrativeSteps';

export default function CampaignFinanceScrollytelling() {
  return <ScrollytellingWrapper Visualization={StickyVisualization} Steps={NarrativeSteps} />;
}
