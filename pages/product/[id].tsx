import { getProduct } from "@/utils/queries";
import { GetServerSideProps } from "next";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import Image from "next/image";

interface Props {
  id: string;
}

const ProductPage = ({ id }: Props) => {
  const { data, isLoading } = useQuery(["product", id], () => getProduct(id));
  if (isLoading) return null;

  return (
    <div>
      <div className="h-screen min-h-screen bg-gray-100 ">
        <section className="h-full max-w-xl mx-auto md:max-w-5xl md:px-7 md:pt-28">
          <div className="flex flex-col h-full md:shadow-lg md:grid md:grid-cols-2 md:h-auto">
            <Image src="/bottles.jpg" width={800} height={800} alt="product" className="" />
            <div className="flex flex-col px-2 py-4 bg-white md:pl-8">
              <h1 className="text-2xl">{data?.name}</h1>

              <div className="pt-1 space-x-2">
                <div className="tag">₱{data?.price} / Kg</div>
                <div className="tag">Available Qty: {data?.quantity}</div>
              </div>
              <div className="pt-4">{data?.description}</div>

              <div className="mt-auto">
                <button
                  className="hidden py-2 font-medium text-white bg-green-500 rounded-sm hover:opacity-90 px-7 md:block"
                  type="button"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div className="mt-auto md:hidden">
              <button
                className="w-full px-2 py-2 font-medium text-white bg-green-500"
                type="button"
              >
                Buy Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) return { notFound: true };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["product", params.id], () => getProduct(params.id as string));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...params,
    },
  };
};

export default ProductPage;
