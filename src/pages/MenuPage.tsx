import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuSection from '../components/MenuSection';

export default function MenuPage() {
  const navigate = useNavigate();

  const handleSelectMenuItem = (_itemTitle: string) => {
    navigate('/order');
  };

  return (
    <div className="py-6">
      <MenuSection onSelectForOrder={handleSelectMenuItem} />
    </div>
  );
}
