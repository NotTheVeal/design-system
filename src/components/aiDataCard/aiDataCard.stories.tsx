import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AiDataCard from './aiDataCard';

const meta: Meta<typeof AiDataCard> = {
  title: 'Components/AiDataCard',
  component: AiDataCard,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof AiDataCard>;

export const Default: Story = {
  args: { title: 'AI Recommendation', description: 'Consider reordering SKU CT-7821.', confidence: 0.94 },
};
export const HighConfidence: Story = {
  args: { title: 'Cost Savings Opportunity', description: 'Switch to aftermarket for SKU 4542-0012. Save $260 per unit.', confidence: 0.97 },
};
export const MediumConfidence: Story = {
  args: { title: 'Vendor Performance Alert', description: 'Vendor GE Healthcare delivery SLA dropped to 82% this quarter.', confidence: 0.71 },
};
export const LowConfidence: Story = {
  args: { title: 'Demand Forecast', description: 'Projected 15% increase in ultrasound probe orders next quarter.', confidence: 0.53 },
};
export const AllConfidenceLevels: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <AiDataCard title="High Confidence" description="Strong recommendation backed by 12 months of data." confidence={0.97} />
      <AiDataCard title="Medium Confidence" description="Moderate recommendation. Consider reviewing manually." confidence={0.71} />
      <AiDataCard title="Low Confidence" description="Exploratory suggestion. Verify before acting." confidence={0.45} />
    </div>
  ),
};
