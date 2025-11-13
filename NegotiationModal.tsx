
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { XIcon } from './icons';

interface NegotiationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onNegotiationAccept: (product: Product, price: number) => void;
}

type NegotiationStatus = 'idle' | 'pending' | 'rejected' | 'counter' | 'accepted';

const NegotiationModal: React.FC<NegotiationModalProps> = ({ isOpen, onClose, product, onNegotiationAccept }) => {
  const [offer, setOffer] = useState('');
  const [status, setStatus] = useState<NegotiationStatus>('idle');
  const [message, setMessage] = useState('');
  const [counterOffer, setCounterOffer] = useState(0);

  useEffect(() => {
    if (product) {
      setStatus('idle');
      setMessage('');
      setOffer('');
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const offerPrice = parseFloat(offer);
    if (isNaN(offerPrice) || offerPrice <= 0) {
      setStatus('idle');
      setMessage('Please enter a valid offer.');
      return;
    }

    setStatus('pending');
    setMessage('Submitting your offer...');

    setTimeout(() => {
      const originalPrice = product.price;
      if (offerPrice >= originalPrice) {
        setStatus('accepted');
        setMessage(`We've accepted your offer of $${offerPrice.toFixed(2)}!`);
        onNegotiationAccept(product, offerPrice);
      } else if (offerPrice >= originalPrice * 0.9) { // > 90%
        setStatus('accepted');
        setMessage(`Great news! Your offer of $${offerPrice.toFixed(2)} has been accepted.`);
        onNegotiationAccept(product, offerPrice);
      } else if (offerPrice >= originalPrice * 0.7) { // 70% - 90%
        const newCounter = Math.ceil(originalPrice * 0.92);
        setCounterOffer(newCounter);
        setStatus('counter');
        setMessage(`Your offer is a bit low. We can offer it for $${newCounter.toFixed(2)}.`);
      } else {
        setStatus('rejected');
        setMessage('We appreciate your offer, but it is too low for us to accept at this time.');
      }
    }, 1500);
  };
  
  const handleAcceptCounter = () => {
    setStatus('accepted');
    setMessage(`Excellent! $${counterOffer.toFixed(2)} is yours. The item has been added to your cart.`);
    onNegotiationAccept(product, counterOffer);
    setTimeout(onClose, 2000);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800">
          <XIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Negotiate Price</h2>
        <p className="text-slate-600 mb-4">for <span className="font-semibold">{product.name}</span></p>
        <p className="text-lg font-medium text-slate-800 mb-4">Original Price: <span className="text-primary">${product.price.toFixed(2)}</span></p>
        
        {status !== 'accepted' && (
        <form onSubmit={handleOfferSubmit} className="space-y-4">
          <div>
            <label htmlFor="offer" className="block text-sm font-medium text-slate-700">Your Offer</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="offer"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                disabled={status === 'pending'}
              />
            </div>
          </div>
          <button type="submit" disabled={status === 'pending'} className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition-colors disabled:bg-slate-400">
            {status === 'pending' ? 'Thinking...' : 'Make Offer'}
          </button>
        </form>
        )}
        
        {message && (
          <div className="mt-4 p-4 rounded-md bg-slate-100 text-center">
            <p className="text-sm font-medium text-slate-800">{message}</p>
            {status === 'counter' && (
              <div className="mt-3">
                 <button onClick={handleAcceptCounter} className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
                  Accept Counter Offer
                </button>
              </div>
            )}
             {status === 'accepted' && (
              <div className="mt-3">
                 <button onClick={onClose} className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NegotiationModal;
