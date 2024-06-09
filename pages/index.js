import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { getStaticProps } from "next/dist/build/templates/pages";
import products from "@/Dummy-backend";

const HomePage = (props) => {
  // alternative approach: we can destruct the props to take the products object by replacing props with {products}
  return (
    <div>
      <ul>
        {props.products.map((product) => (
          <li id={product.id} key={product.id}>
            {" "}
            {product.id}
            <Link href={product.id}>-{product.title}</Link>
          </li>
        ))}
        {/*here we should delete props if you used props destucturing hence it would be: products.map */}
      </ul>
    </div>
  );
};
export async function getStaticProps(context) {
  console.log("(Re)-generating");
  const filePath = path.join(process.cwd(), "Dummy-backend.json");
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData);
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
export default HomePage;
