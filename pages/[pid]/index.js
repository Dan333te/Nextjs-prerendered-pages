import React, { Fragment } from "react";
import path from "path";
import fs from "fs/promises";
const productDetailsPage = (props) => {
  const { loadedProduct } = props;
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const filePath = path.join(process.cwd(), "Dummy-backend.json");
  const readedData =  await fs.readFile(filePath);
  const convertedData = JSON.parse(readedData);
  const desiredProduct = convertedData.products.find(
    (product) => product.id === productId
  );
  return {
    props: {
      loadedProduct: desiredProduct,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
      {params:{pid:'p4'}},
     
    ],
    fallback:false
  };
}
export default productDetailsPage;
