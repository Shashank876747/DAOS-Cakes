import React from 'react';
import { useNavigate } from 'react-router-dom';
import CakeEstimatorSection from '../components/CakeEstimatorSection';

export default function EstimatorPage() {
  const navigate = useNavigate();

  const handleApplyEstimate = (_details: string) => {
    navigate('/order');
  };

  return (
    <div className="py-6">
      <CakeEstimatorSection onApplyToOrder={handleApplyEstimate} />
    </div>
  );
}
