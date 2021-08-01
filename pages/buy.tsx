import LinkTo from "@/compomemts/LinkTo";
import { getProducts } from "@/utils/queries";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";

const BuyPage = () => {
  const products = useQuery("products", () => getProducts());
  if (products.isLoading) return null;
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center p-2 text-xl font-medium tracking-wide text-white bg-green-400">
        TRASHTALK
      </div>
      <section className="px-4 pt-8">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="grid gap-5 pt-4 md:gap-8 grid-auto-150">
          {products.data?.map((product) => {
            return (
              <LinkTo key={product.id} href={`/product/${product.id}`}>
                <div className="flex flex-col shadow w-max">
                  <Image src="/bottles.jpg" width={160} height={160} alt="product" />
                  <div className="p-2 bg-white">
                    <h4 className="font-bold ">{product.name}</h4>
                    <div>
                      <p className="text-sm">
                        {product.quantity}Kg • P{product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </LinkTo>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default BuyPage;
