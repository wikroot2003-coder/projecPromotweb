import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { smartphones } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Icon, FillIcon, icons } from "../components/Icons";

// Breadcrumb Component
const Breadcrumb = ({ items }) => (
  <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
    {items.map((item, index) => (
      <div key={index} className="flex items-center gap-2">
        {index > 0 && <span className="text-gray-300">/</span>}
        {item.href ? (
          <Link to={item.href} className="hover:text-cyan-600 transition-colors">
            {item.label}
          </Link>
        ) : (
          <span className="text-gray-800 font-medium">{item.label}</span>
        )}
      </div>
    ))}
  </nav>
);

// Rating Stars Component
const RatingStars = ({ rating, size = "sm" }) => {
  const stars = [];
  const sizeClass = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= Math.floor(rating);
    const isHalf = i === Math.ceil(rating) && rating % 1 !== 0;
    stars.push(
      <span key={i} className={isFilled ? "text-amber-400" : isHalf ? "text-amber-300" : "text-gray-200"}>
        <FillIcon d={icons.star} className={`${sizeClass} inline`} />
      </span>
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
};

// Badge Component
const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-cyan-50 text-cyan-700",
    success: "bg-green-100 text-green-700",
    danger: "bg-red-50 text-red-700",
    warning: "bg-amber-50 text-amber-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-cyan-200 hover:shadow-sm transition-all duration-200">
    <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
      <Icon d={icon} className="w-5 h-5 text-cyan-600" />
    </div>
    <div>
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </div>
  </div>
);

// Tab Button Component
const TabButton = ({ active, onClick, label, count }) => (
  <button
    onClick={onClick}
    className={`relative px-6 py-4 text-sm font-medium transition-all duration-200 ${
      active
        ? "text-cyan-600"
        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
    }`}
  >
    {label}
    {count !== undefined && <span className="ml-1 text-gray-400">({count.toLocaleString()})</span>}
    {active && (
      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500" />
    )}
  </button>
);

// Review Card Component
const ReviewCard = ({ review }) => (
  <div className="py-6 border-b border-gray-100 last:border-0">
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center text-cyan-700 text-sm font-bold shrink-0">
        {review.user.charAt(0)}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-semibold text-gray-900">{review.user}</h4>
          <span className="text-xs text-gray-400">{review.date}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <RatingStars rating={review.rating} />
          <Badge variant={review.verified ? "success" : "default"}>
            {review.verified ? "Verified Purchase" : "Guest"}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
      </div>
    </div>
  </div>
);

// Main Component
export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = smartphones.find((p) => p.id === Number(id));
  const { addItem, items } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImg, setSelectedImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon d={icons.search} className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
          <p className="text-gray-500 mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-cyan-600 transition-colors"
          >
            <Icon d={icons.arrowLeft} className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const liked = isInWishlist(product.id);
  const gallery = product.gallery || [product.image];
  const cartQty = items.find((item) => item.id === product.id)?.qty || 0;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    navigate("/checkout");
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  // Sample reviews data
  const reviews = [
    { user: "Rahul Sharma", rating: 5, text: "Absolutely fantastic phone! The camera quality is phenomenal and the battery lasts all day. Very satisfied with my purchase. The display is crisp and colors are vibrant. Highly recommend!", date: "2 days ago", verified: true },
    { user: "Priya Malhotra", rating: 4, text: "Great value for money. Delivery was super fast and packaging was excellent. The phone performs smoothly for daily tasks and gaming. Only minor issue is the speaker could be louder.", date: "1 week ago", verified: true },
    { user: "Amit Kumar", rating: 5, text: "Exceeded my expectations! The Nightography feature on the camera is mind-blowing. Build quality is premium and the S Pen is incredibly useful for note-taking.", date: "2 weeks ago", verified: true },
    { user: "Sneha Patel", rating: 4, text: "Good phone overall. Charging is fast, screen is beautiful. Wish it came with a charger in the box though. Otherwise very happy with the purchase.", date: "3 weeks ago", verified: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Smartphones", href: "/category/electronics" },
            { label: product.name },
          ]}
        />

        {/* Product Main Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Image Gallery */}
            <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
              {/* Main Image */}
              <div
                className={`relative bg-gray-50 rounded-2xl overflow-hidden mb-4 cursor-zoom-in transition-all duration-300 ${
                  isZoomed ? "h-[500px]" : "h-80 lg:h-96"
                }`}
                onClick={handleImageClick}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`absolute top-4 right-4 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                    liked
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-400 hover:text-red-500 hover:bg-red-50"
                  }`}
                >
                  {liked ? (
                    <FillIcon d={icons.heart} className="w-6 h-6" />
                  ) : (
                    <Icon d={icons.heart} className="w-6 h-6" />
                  )}
                </button>

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="danger">{product.discount} OFF</Badge>
                </div>

                {/* In Stock Badge */}
                <div className="absolute bottom-4 left-4 z-10">
                  <Badge variant="success">In Stock</Badge>
                </div>

                <img
                  src={gallery[selectedImg]}
                  alt={product.name}
                  className={`w-full h-full object-contain p-8 transition-transform duration-300 ${
                    isZoomed ? "scale-110" : "scale-100"
                  }`}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 justify-center">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedImg(i);
                      setIsZoomed(false);
                    }}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                      selectedImg === i
                        ? "ring-2 ring-cyan-500 ring-offset-2"
                        : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain bg-gray-50 p-2" />
                    {selectedImg === i && (
                      <div className="absolute inset-0 bg-cyan-500/10" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="p-6 lg:p-8">
              {/* Brand Tag */}
              <div className="mb-3">
                <Badge variant="primary">Samsung</Badge>
              </div>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <RatingStars rating={product.rating || 4.5} size="lg" />
                <span className="text-sm font-semibold text-gray-700">
                  {product.rating || 4.5}
                </span>
                <span className="text-sm text-gray-400">
                  ({(product.reviews || 2847).toLocaleString()} reviews)
                </span>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-cyan-50 to-white rounded-xl p-5 mb-6 border border-cyan-100">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-green-600">
                    You save ₹{product.save.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">Inclusive of all taxes</span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Icon d={icons.minus} className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Icon d={icons.plus} className="w-4 h-4" />
                    </button>
                  </div>
                  {cartQty > 0 && (
                    <span className="text-sm text-green-600 font-medium">
                      {cartQty} in cart
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    added
                      ? "bg-green-500 text-white"
                      : "bg-white border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50"
                  }`}
                >
                  {added ? (
                    <>
                      <Icon d={icons.check} className="w-5 h-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <Icon d={icons.cart} className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 rounded-xl font-semibold text-sm bg-cyan-500 text-white hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-200"
                >
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                <FeatureCard
                  icon={icons.truck}
                  title="Free Delivery"
                  description="On orders above ₹500"
                />
                <FeatureCard
                  icon={icons.shield}
                  title="1 Year Warranty"
                  description="Manufacturer warranty"
                />
                <FeatureCard
                  icon={icons.checkCircle}
                  title="7-Day Returns"
                  description="Easy return policy"
                />
                <FeatureCard
                  icon={icons.creditCard}
                  title="Secure Payment"
                  description="100% secure checkout"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100 bg-gray-50/50">
            <TabButton
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
              label="Overview"
            />
            <TabButton
              active={activeTab === "specs"}
              onClick={() => setActiveTab("specs")}
              label="Specifications"
            />
            <TabButton
              active={activeTab === "reviews"}
              onClick={() => setActiveTab("reviews")}
              label="Reviews"
              count={product.reviews || 2847}
            />
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Key Highlights */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Key Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { icon: icons.smartphone, title: "Stunning Display", desc: "6.8\" Dynamic AMOLED 2X with 120Hz refresh rate" },
                      { icon: icons.smartphone, title: "Pro-Grade Camera", desc: "108MP main camera with Nightography" },
                      { icon: icons.smartphone, title: "All-Day Battery", desc: "5000mAh with 45W fast charging" },
                      { icon: icons.smartphone, title: "Powerful Performance", desc: "Snapdragon 8 Gen 1 processor" },
                      { icon: icons.smartphone, title: "Ample Storage", desc: "256GB internal storage" },
                      { icon: icons.smartphone, title: "5G Ready", desc: "Ultra-fast 5G connectivity" },
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                        <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center shrink-0">
                          <Icon d={feature.icon} className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{feature.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What&apos;s in the Box */}
                <div className="border-t border-gray-100 pt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">What&apos;s in the Box</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Galaxy Phone", "USB-C Cable", "SIM Ejector Tool", "Quick Start Guide", "Warranty Card"].map((item) => (
                      <span key={item} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && product.specs && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Technical Specifications</h3>
                <div className="divide-y divide-gray-100">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex py-4">
                      <span className="w-40 text-sm text-gray-500 shrink-0">{key}</span>
                      <span className="text-sm text-gray-900 font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
                    <RatingStars rating={product.rating || 4.5} size="lg" />
                    <span className="text-sm font-semibold text-gray-700">
                      {product.rating || 4.5} out of 5
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {reviews.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
