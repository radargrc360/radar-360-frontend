"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export interface Risk {
  riscos_id: number;
  codigo_risco: string;
  titulo: string;
  descricao_risco: string;
  score: string;
  status_riscos: string;
  responsavel: string;
  departamento_organizacional_id: number;
}

interface RisksTableProps {
  data: Risk[];
}

export function RisksTable({ data }: RisksTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Risk>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        />
      ),
      size: 20,
    },

    {
      accessorKey: "codigo_risco",
      header: "ID",
    },

    {
      accessorKey: "titulo",
      header: "Nome",
      cell: ({ row }) => (
        <div className="font-medium flex items-center gap-2 text-dark">
          <Image
            src="/user.png"
            alt="Risk"
            width={1920}
            height={1080}
            className="rounded-full w-12 h-12"
          />
          {row.original.titulo}
        </div>
      ),
    },

    {
      accessorKey: "descricao_risco",
      header: "Descrição",
      cell: ({ row }) => (
        <p className="max-w-sm text-gray-500 line-clamp-2">
          {row.original.descricao_risco}
        </p>
      ),
    },

    {
      accessorKey: "responsavel",
      header: "Responsável",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Image
            src="/user.png"
            alt="User"
            width={1920}
            height={1080}
            className="rounded-full w-10 h-10"
          />
          {row.original.responsavel}
        </div>
      ),
    },

    {
      accessorKey: "departamento_organizacional_id",
      header: "Unidade Organizacional",
      cell: ({ row }) => (
        <span className="text-gray-500">
          {row.original.departamento_organizacional_id}
        </span>
      ),
    },

    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => (
        <div
          className={`px-2 rounded-full w-fit flex items-center justify-center text-sm
          ${
            row.original.score === "Crítico"
              ? "border border-red-600 bg-red-500/20 text-red-700"
              : row.original.score === "Alto"
              ? "border border-orange-600 bg-orange-500/20 text-orange-700"
              : row.original.score === "Médio"
              ? "border border-yellow-600 bg-yellow-500/20 text-yellow-700"
              : "border border-green-600 bg-green-500/20 text-green-700"
          }`}
        >
          {row.original.score}
        </div>
      ),
    },

    {
      accessorKey: "status_riscos",
      header: "Estado",
      cell: ({ row }) => (
        <div className="border border-orange-600 bg-orange-500/20 text-orange-700 px-2 rounded-full flex w-fit items-center justify-center">
          {row.original.status_riscos}
        </div>
      ),
    },

    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 rounded hover:bg-gray-100">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("Ver", row.original)}>
              Ver
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log("Editar", row.original)}>
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log("Eliminar", row.original)}>
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md p-3 w-full text-gray-500">
      <Table className="w-full text-gray-500">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={
                    header.column.getCanSort()
                      ? "cursor-pointer select-none text-gray-400"
                      : ""
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}

                  {header.column.getIsSorted() === "asc" && " ↑"}
                  {header.column.getIsSorted() === "desc" && " ↓"}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-10">
                Nenhum risco encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}