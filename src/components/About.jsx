import ProductCard from "./shared/ProductCard";

const products = [
    {
        image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&h=400&fit=crop",
        productName: "iPhone 13 Pro Max",
        description:
            "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features.",
        specialPrice: 720,
        price: 780,
        quantity: 10,
    },
    {
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=400&fit=crop",
        productName: "Samsung Galaxy S21",
        description:
            "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design.",
        specialPrice: 699,
        price: 799,
        quantity: 5,
    },
    {
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=400&fit=crop",
        productName: "Google Pixel 6",
        description:
            "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display for Android enthusiasts.",
        price: 599,
        specialPrice: 400,
        quantity: 8,
    },
];

const About = () => {
    return (
        <div className="lg:px-14 sm:px-8 px-4 py-16">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                    Our Story
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white mt-3">
                    About E-Shop
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                    We're dedicated to providing the best products and a seamless shopping
                    experience. Quality, trust, and customer satisfaction drive everything we do.
                </p>
            </div>

            {/* Values */}
            <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
                {[
                    {
                        title: "Quality First",
                        desc: "Every product is carefully vetted to meet our high standards.",
                        icon: "✨",
                    },
                    {
                        title: "Customer Focus",
                        desc: "Your satisfaction is our top priority, always.",
                        icon: "❤️",
                    },
                    {
                        title: "Fast Delivery",
                        desc: "Quick and reliable shipping to your doorstep.",
                        icon: "🚀",
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="text-center p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition"
                    >
                        <span className="text-4xl">{item.icon}</span>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-4">{item.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Featured Products */}
            <div className="py-12 border-t border-slate-200">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-800">Our Products</h2>
                    <p className="text-slate-500 mt-2">A glimpse of what we offer</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            image={product.image}
                            productName={product.productName}
                            description={product.description}
                            specialPrice={product.specialPrice}
                            price={product.price}
                            about
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
