/* import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
console.log(Category);

export default function Layout({ children, categories }) {
  return (
    <div className="grid grid-cols-[0.4fr_1.6fr]">
      <aside className="bg-primary text-white border-blue-500 border-4 text-3xl">
        {categories &&
          categories.map((category, index) => (
            <p key={index}>{category._id}</p>
          ))}
      </aside>
      <div className="border-red-500 border-4">{children}</div>
    </div>
  );
}

// Grab categories for nav
export async function getServerSideProps() {
  try {
    await mongooseConnect();
    const categories = await Category.find();

    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      props: {
        categories: [],
      },
    };
  }
}
 */
