import React from 'react';

interface CartItem {
  id: string | number;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  image?: string;
  onQuantityChange?: (id: string | number, qty: number) => void;
  onRemove?: (id: string | number) => void;
}

interface CartProps {
  items: CartItem[];
  subtotal?: number;
  tax?: number;
  total?: number;
  onCheckout?: () => void;
  className?: string;
}

const Cart: React.FC<CartProps> = ({
  items = [],
  subtotal,
  tax,
  total,
  onCheckout,
  className = '',
}) => {
  const calcSubtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const displaySubtotal = subtotal ?? calcSubtotal;
  const displayTotal = total ?? displaySubtotal + (tax ?? 0);

  const fmt = (n: number) => `$${n.toFixed(2)}`;

  return (
    <div className={`flex flex-col bg-white border border-[#DCDCDC] rounded-[8px] shadow-[0_1px_4px_rgba(0,47,72,0.08)] overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-[#DCDCDC]">
        <h2 className="text-[18px] font-semibold text-[#002F48]">Shopping Cart</h2>
        <p className="text-[13px] text-[#777777]">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex-1 overflow-auto divide-y divide-[#DCDCDC]">
        {items.length === 0 ? (
          <div className="py-12 text-center text-[14px] text-[#949494]">Your cart is empty</div>
        ) : (
          items.map(item => (
            <div key={item.id} className="flex items-start gap-4 px-6 py-4">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-[60px] h-[60px] object-contain rounded-[4px] border border-[#DCDCDC] flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-[#4A4A4A] truncate">{item.name}</p>
                {item.description && <p className="text-[12px] text-[#777777] mt-0.5">{item.description}</p>}
                <p className="text-[14px] font-bold text-[#002F48] mt-1">{fmt(item.price)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => item.onQuantityChange?.(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-[28px] h-[28px] flex items-center justify-center rounded-[4px] border border-[#DCDCDC] text-[#4A4A4A] hover:border-[#005BA6] hover:text-[#005BA6] disabled:opacity-50 transition-colors">
                    −
                  </button>
                  <span className="text-[14px] font-semibold text-[#4A4A4A] w-[24px] text-center">{item.quantity}</span>
                  <button onClick={() => item.onQuantityChange?.(item.id, item.quantity + 1)}
                    className="w-[28px] h-[28px] flex items-center justify-center rounded-[4px] border border-[#DCDCDC] text-[#4A4A4A] hover:border-[#005BA6] hover:text-[#005BA6] transition-colors">
                    +
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-[14px] font-bold text-[#002F48]">{fmt(item.price * item.quantity)}</p>
                {item.onRemove && (
                  <button onClick={() => item.onRemove!(item.id)} className="mt-2 text-[12px] text-[#777777] hover:text-[#E00000] transition-colors">
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="px-6 py-4 border-t border-[#DCDCDC] bg-[#FAFAFA]">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between text-[14px] text-[#777777]">
            <span>Subtotal</span><span>{fmt(displaySubtotal)}</span>
          </div>
          {tax !== undefined && (
            <div className="flex justify-between text-[14px] text-[#777777]">
              <span>Tax</span><span>{fmt(tax)}</span>
            </div>
          )}
          <div className="flex justify-between text-[16px] font-bold text-[#002F48] pt-2 border-t border-[#DCDCDC]">
            <span>Total</span><span>{fmt(displayTotal)}</span>
          </div>
        </div>
        {onCheckout && (
          <button onClick={onCheckout} disabled={items.length === 0}
            className="w-full h-[50px] bg-[#005BA6] text-white text-[16px] font-semibold rounded-[4px] hover:bg-[#004A84] disabled:bg-[#DCDCDC] disabled:cursor-not-allowed transition-colors border-2 border-[#005BA6] hover:border-[#004A84]">
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
