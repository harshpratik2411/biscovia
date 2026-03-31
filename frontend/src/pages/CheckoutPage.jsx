import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Cookie, MapPin, CreditCard, ShoppingBag, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ setPosition, setAddress }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      // Mock reverse geocoding
      setAddress(`Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`);
    },
  });

  return null;
}

function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [position, setPosition] = useState({ lat: 12.9716, lng: 77.5946 }); // Bangalore default
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [razorpayKey, setRazorpayKey] = useState('');

  useEffect(() => {
    fetchRazorpayKey();
  }, []);

  const fetchRazorpayKey = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/orders/key');
      const data = await response.json();
      setRazorpayKey(data.key);
    } catch (error) {
      console.error('Error fetching Razorpay key:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    }
    if (cartItems.length === 0 && !orderSuccess) {
      navigate('/menu');
    }
  }, [user, cartItems, navigate, orderSuccess]);

  const handlePayment = async () => {
    if (!address) {
      alert('Please select a delivery location on the map');
      return;
    }

    setLoading(true);

    try {
      // 1. Create order on backend
      const response = await fetch('http://localhost:5001/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: getCartTotal(),
          items: cartItems,
          userId: user.userId,
          address,
          lat: position.lat,
          lng: position.lng
        })
      });

      const data = await response.json();

      if (!data.success) throw new Error('Failed to create order');

      // Initialize real Razorpay
      const options = {
        key: razorpayKey, 
        amount: data.order.amount,
        currency: 'INR',
        name: 'Biskovia',
        description: 'Cookie Purchase',
        order_id: data.order.id,
        handler: async function (response) {
          // 3. Verify payment
          const verifyRes = await fetch('http://localhost:5001/api/orders/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setOrderSuccess(true);
            clearCart();
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: user.name,
          email: user.email
        },
        theme: {
          color: '#3d2510'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        setLoading(false);
        alert(`Payment Failed: ${response.error.description}`);
      });

      rzp.open();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong during checkout');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#f5e4cf] flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-[#f9e7cf] rounded-[2.5rem] p-10 text-center shadow-2xl"
        >
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-white mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-[#3d2510] mb-2">Order Confirmed!</h1>
          <p className="text-[#3d2510]/70 mb-8">Your cookies are being prepared in our oven. They'll reach you shortly!</p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#3d2510] text-[#f5e4cf] py-4 rounded-2xl font-bold hover:bg-[#2b180b] transition-all"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5e4cf] text-[#3d2510] pb-12">
      <header className="bg-[#3d2510] text-[#f5e4cf] py-6 px-6 sticky top-0 z-[1000]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold">
            <ArrowLeft className="h-4 w-4" /> BACK
          </button>
          <div className="flex items-center gap-2">
            <Cookie className="h-6 w-6" />
            <span className="font-bold tracking-widest uppercase">Checkout</span>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <section className="bg-[#f9e7cf] rounded-[2rem] p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-[#3d2510] text-[#f5e4cf] flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold">Delivery Location</h2>
            </div>
            
            <p className="text-sm text-[#3d2510]/60 mb-4 font-medium">Click on the map to set your delivery address</p>
            
            <div className="h-[400px] rounded-2xl overflow-hidden border-4 border-[#3d2510]/10">
              <MapContainer center={[position.lat, position.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[position.lat, position.lng]} />
                <LocationMarker setPosition={setPosition} setAddress={setAddress} />
              </MapContainer>
            </div>
            
            <div className="mt-6">
              <label className="text-xs font-bold text-[#3d2510]/60 uppercase ml-1">Selected Address</label>
              <div className="mt-1 bg-[#f5e4cf] border border-[#d3a971]/30 rounded-xl p-4 text-sm font-medium">
                {address || 'Please select a location on the map'}
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="bg-[#3d2510] text-[#f5e4cf] rounded-[2rem] p-8 shadow-xl sticky top-28">
            <div className="flex items-center gap-3 mb-8">
              <ShoppingBag className="h-6 w-6 text-[#f7d7a3]" />
              <h2 className="text-xl font-bold">Order Summary</h2>
            </div>

            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-[11px] text-[#f7d7a3]">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#f5e4cf]/10 pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#f5e4cf]/60">Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#f5e4cf]/60">Delivery</span>
                <span className="text-green-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-[#f5e4cf]/10">
                <span>Total</span>
                <span className="text-[#f7d7a3]">₹{getCartTotal()}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-[#f5e4cf] text-[#3d2510] py-4 rounded-2xl font-bold mt-8 hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              <CreditCard className="h-5 w-5" />
              {loading ? 'Processing...' : 'Pay with Razorpay'}
            </button>
            
            <p className="text-[10px] text-center text-[#f5e4cf]/40 mt-6 uppercase tracking-widest font-bold">
              Secure Encrypted Payment
            </p>
          </section>
        </aside>
      </main>
    </div>
  );
}

export default CheckoutPage;
