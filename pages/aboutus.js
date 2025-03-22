import Header from "@/components/Header";

export default function AboutusPage() {
  return (
    <>
      <Header />
      <div className="center">
        <h1 className="mt-10 mb-8 text-2xl font-semibold">About Us</h1>
        <h2 className="mb-4 text-xl font-medium text-gray-800">
          Welcome to ElectroHaat, your go-to online store for high-quality
          electronics and appliances!
        </h2>
        <p className="mb-2 text-gray-700">
          We are two passionate tech enthusiasts and final-year students from
          Chittagong Independent University, bringing our vision to life through
          this platform. What started as our senior year project has now evolved
          into something bigger—a business that aims to provide a seamless and
          reliable online shopping experience for electronics lovers.
        </p>
        <p className="mb-2 text-gray-700">
          Each of us played a key role in building ElectroHaat. One of us
          developed the admin panel, ensuring smooth product management, order
          tracking, and efficient store operations. The other focused on
          crafting the storefront, designing an intuitive and engaging shopping
          experience for our customers.
        </p>
        <p className="mb-2 text-gray-700">
          At ElectroHaat, we are committed to offering a user-friendly, secure,
          and efficient platform for all your electronic needs. Whether you're
          looking for the latest gadgets, home appliances, or accessories, we
          strive to bring you the best products at competitive prices.
        </p>
        <p className="text-gray-700">
          This journey is just beginning, and we’re excited to grow ElectroHaat
          into a trusted name in the industry. Thank you for supporting us—we
          look forward to serving you!
        </p>
      </div>
    </>
  );
}
