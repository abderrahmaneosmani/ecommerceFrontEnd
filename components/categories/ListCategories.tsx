import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import { NEXT_URL } from "../../utils/vars";

export default function ListCategories({ sections }: any) {
  return (
    <div>
      <Disclosure.Panel className="pt-6">
        <div className="space-y-4">
          {sections.map((category: any, categoryIdx: any) => (
            // eslint-disable-next-line react/jsx-key
            <Link
              href={`https://ecommerce-front-end-six.vercel.app/products/category/${category.id}`}
            >
              <div key={category.value} className="flex items-center">
                <label
                  htmlFor={`filter-${category.id}-${categoryIdx}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {category.title}
                </label>
              </div>
            </Link>
          ))}
        </div>
      </Disclosure.Panel>
    </div>
  );
}
