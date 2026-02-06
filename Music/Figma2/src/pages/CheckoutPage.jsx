import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Icon, icons } from "../components/Icons";

const steps = ["Shipping", "Payment", "Confirmation"];

export default function CheckoutPage() {
  const { items, totalPrice, setIsOpen } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [address, setAddress] = useState({
    fullName: "", phone: "", street: "", city: "", state: "", zip: "",
  });
  const [payment, setPayment] = useState({
    method: "card",
    cardNumber: "", cardName: "", expiry: "", cvv: "",
  });

  const shipping = totalPrice >= 500 ? 0 : 40;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="px-4 md:px-8 py-16 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon d={icons.cart} className="w-10 h-10 text-gray-300" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
        <p className="text-sm text-gray-400 mb-6">Add items to your cart before checkout.</p>
        <Link to="/" className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-cyan-600 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const isAddressValid = address.fullName && address.phone && address.street && address.city && address.state && address.zip;
  const isPaymentValid = payment.method === "cod" || (payment.cardNumber.length >= 16 && payment.cardName && payment.expiry && payment.cvv.length >= 3);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setStep(2);
  };

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-400 transition-all";

  return (
    <div className="px-4 md:px-8 py-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-cyan-500 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Checkout</span>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                i < step || orderPlaced ? "bg-green-500 text-white" :
                i === step ? "bg-cyan-500 text-white shadow-lg shadow-cyan-200" :
                "bg-gray-100 text-gray-400"
              }`}>
                {i < step || (i === 2 && orderPlaced) ? (
                  <Icon d={icons.check} className="w-5 h-5" />
                ) : i + 1}
              </div>
              <span className={`text-xs mt-2 font-medium ${
                i <= step ? "text-gray-800" : "text-gray-400"
              }`}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 md:w-24 h-0.5 mx-2 mb-5 transition-all duration-300 ${
                i < step ? "bg-green-500" : "bg-gray-200"
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 0: Shipping Address */}
          {step === 0 && !orderPlaced && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
                  <Icon d={icons.mapPin} className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Shipping Address</h2>
                  <p className="text-xs text-gray-400">Where should we deliver your order?</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Full Name *</label>
                  <input type="text" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} placeholder="John Doe" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone Number *</label>
                  <input type="tel" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} placeholder="+91 98765 43210" className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Street Address *</label>
                  <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} placeholder="123, Main Street, Apartment 4B" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">City *</label>
                  <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="Mumbai" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">State *</label>
                  <input type="text" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} placeholder="Maharashtra" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">ZIP Code *</label>
                  <input type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} placeholder="400001" className={inputClass} />
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                disabled={!isAddressValid}
                className={`mt-6 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  isAddressValid ? "bg-cyan-500 text-white hover:bg-cyan-600" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && !orderPlaced && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
                  <Icon d={icons.creditCard} className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
                  <p className="text-xs text-gray-400">Choose how you'd like to pay</p>
                </div>
              </div>

              {/* Payment Options */}
              <div className="flex gap-3 mb-6">
                {[
                  { key: "card", label: "Credit/Debit Card", icon: icons.creditCard },
                  { key: "cod", label: "Cash on Delivery", icon: icons.truck },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setPayment({ ...payment, method: opt.key })}
                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                      payment.method === opt.key
                        ? "border-cyan-500 bg-cyan-50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <Icon d={opt.icon} className={`w-5 h-5 ${payment.method === opt.key ? "text-cyan-500" : "text-gray-400"}`} />
                    <span className={`text-sm font-medium ${payment.method === opt.key ? "text-cyan-700" : "text-gray-600"}`}>{opt.label}</span>
                  </button>
                ))}
              </div>

              {/* Card Form */}
              {payment.method === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Card Number *</label>
                    <input type="text" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value.replace(/\D/g, "").slice(0, 16) })} placeholder="1234 5678 9012 3456" maxLength={16} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Cardholder Name *</label>
                    <input type="text" value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} placeholder="JOHN DOE" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Expiry Date *</label>
                      <input type="text" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} placeholder="MM/YY" maxLength={5} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">CVV *</label>
                      <input type="password" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="***" maxLength={4} className={inputClass} />
                    </div>
                  </div>
                </div>
              )}

              {payment.method === "cod" && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <Icon d={icons.truck} className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Cash on Delivery</p>
                    <p className="text-xs text-amber-600 mt-1">Pay when your order arrives. Please keep exact change ready.</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(0)} className="flex-1 py-3.5 rounded-xl font-semibold text-sm border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={!isPaymentValid}
                  className={`flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isPaymentValid ? "bg-cyan-500 text-white hover:bg-cyan-600" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {orderPlaced && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <Icon d={icons.checkCircle} className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
              <p className="text-sm text-gray-500 mb-2">Your order #MG{Date.now().toString().slice(-8)} has been confirmed.</p>
              <p className="text-sm text-gray-400 mb-8">We'll send you a confirmation email shortly.</p>

              <div className="bg-gray-50 rounded-xl p-5 text-left mb-6 space-y-3">
                <h3 className="text-sm font-bold text-gray-800 mb-3">Order Summary</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery To</span>
                  <span className="text-gray-800 font-medium text-right">{address.fullName}<br/><span className="font-normal text-gray-500">{address.street}, {address.city}</span></span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment</span>
                  <span className="text-gray-800 font-medium">{payment.method === "cod" ? "Cash on Delivery" : `Card ending ****${payment.cardNumber.slice(-4)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="text-gray-900 font-bold">₹{grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estimated Delivery</span>
                  <span className="text-green-600 font-medium">3-5 Business Days</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => navigate("/")} className="flex-1 py-3.5 rounded-xl font-semibold text-sm bg-cyan-500 text-white hover:bg-cyan-600 transition-colors">
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        {!orderPlaced && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-4">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Order Summary ({items.length} items)</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                      <p className="text-xs font-bold text-gray-900">₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-800">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={shipping === 0 ? "text-green-500 font-medium" : "text-gray-800"}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold border-t border-gray-100 pt-2 mt-2">
                  <span className="text-gray-800">Total</span>
                  <span className="text-gray-900">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
