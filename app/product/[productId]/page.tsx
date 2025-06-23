import { getProductIds } from "../../lib/getProductIds";
import ProductPageClient from "./ProductPageClient";

// This runs at build time for static generation
export async function generateStaticParams() {
  const productIds = getProductIds();

  return productIds.map((productId) => ({
    productId: productId,
  }));
}

// Server component that passes params to client component
export default function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  return <ProductPageClient params={params} />;
}
