"use client";
import { TLooseStorySchema } from "@/shared-lib";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { stories } from "./stories";
import { Flex, IconButton, Table } from "@radix-ui/themes";
import Link from "next/link";
import PublishToggler from "./PublishToggler";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

const columns = [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  //   cell: (props: any) => <p>{props.getValue()}</p>,
  // },
  {
    accessorKey: "title",
    header: "Title",
    cell: (props: any) => {
      return (
        <Flex align="center" gap="2">
          <p
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              // wordWrap: "normal",
              textWrap: "nowrap",
            }}
          >
            {props.getValue()}
          </p>
          <Link href={`/me/stories/edit/${props.row.original.id}`}>
            <IconButton size="1" variant="soft">
              <ExternalLinkIcon />
            </IconButton>
          </Link>
        </Flex>
      );
    },
  },
  // {
  //   accessorKey: "slug",
  //   header: "Slug",
  //   cell: (props: any) => <p className="text-nowrap">{props.getValue()}</p>,
  // },
  {
    accessorKey: "isPublished",
    header: "Statuc",
    cell: (props: any) => (
      <PublishToggler id={props.row.original.id} value={props.getValue()} />
    ),
  },
];

const StoriesTable = ({ stories }: { stories: TLooseStorySchema[] }) => {
  const [data, setData] = useState(stories);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table.Root
      size="3"
      variant="surface"
      style={
        {
          // width: table.getTotalSize(),
        }
      }
    >
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => (
              <Table.ColumnHeaderCell key={header.id} align="center">
                {header.column.columnDef.header}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        ))}
      </Table.Header>

      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id} align="center">
            {row.getVisibleCells().map((cell) => (
              <Table.RowHeaderCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.RowHeaderCell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default StoriesTable;
