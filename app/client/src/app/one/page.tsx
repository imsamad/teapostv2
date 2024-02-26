import { Flex, Heading } from "@radix-ui/themes";
import React from "react";

const One = function (props: any) {
  return (
    <div>
      <Heading>Onne</Heading>
      <Heading>{Math.random()}</Heading>
      <Heading>{JSON.stringify(props, null, 4)}</Heading>
      <Flex>
        <div className="order-5  border-2 border-red-300 p-3 ">one</div>
        <div className="order-2  border-2 border-red-300 p-3 ">two</div>
        <div className="order-3  border-2 border-red-300 p-3 ">three</div>
        <div className="order-4  border-2 border-red-300 p-3 ">four</div>
      </Flex>
    </div>
  );
};

export default One;
