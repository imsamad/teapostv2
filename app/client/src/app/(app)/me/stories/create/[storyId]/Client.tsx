"use client";
import { cn } from "@/lib/utils";
import React from "react";

const Client = ({ content }: any) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content,
      }}
      className="prose dark:prose-invert
  prose-h1:font-bold prose-h1:text-xl
  prose-text-gray-800
  prose-a:text-blue-600 prose-p:text-justify prose-img:rounded-xl
  prose-headings:underline"
      // @ts-ignore
      className2={cn(
        "prose prose-violet mx-auto dark:prose-invert",
        // prose - anchor tag modifications 👇
        "prose-a:border-b-2 prose-a:border-violet-500 prose-a:pb-[0.2rem] prose-a:no-underline hover:prose-a:opacity-80",
        // prose - inline-code tag modifications 👇
        "prose-code:rounded-md prose-code:px-2 prose-code:py-1",
        "prose-code:bg-green-100 prose-code:font-normal prose-code:text-green-600",
        "dark:prose-code:bg-green-600/10 dark:prose-code:text-green-400",
        "prose-code:before:content-[''] prose-code:after:content-['']",
        // prose - code-block(pre > code) modifications 👇
        "[&>pre>code]:p-0 [&>pre>code]:before:hidden [&>pre>code]:after:hidden",
        "[&>pre>code]:bg-transparent [&>pre>code]:text-green-600 dark:[&>pre>code]:bg-transparent dark:[&>pre>code]:text-green-400",
        // prose - pre tag modifications 👇
        "prose-pre:px- prose-pre:py- prose-pre:border prose-pre:border-gray-200 prose-pre:bg-transparent",
        "dark:prose-pre:border-neutral-600",
        // prose - table modifications 👇
        "prose-table:border prose-th:p-4 prose-th:text-left prose-th:text-lg prose-td:px-4 prose-td:py-3 prose-td:text-left dark:prose-table:border-gray-600",
        // prose - th,td border-left modifications 👇
        "[&>table>thead>tr>th:not(:first-of-type)]:border-l",
        "[&>table>tbody>tr>td:not(:first-of-type)]:border-l",
        "dark:[&>table>thead>tr>th:not(:first-of-type)]:border-neutral-600",
        "dark:[&>table>tbody>tr>td:not(:first-of-type)]:border-neutral-600"
      )}
    />
  );
};

export default Client;
