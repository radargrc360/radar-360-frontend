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

export interface Users {
  id: string;
  nome: string;
  email: string;
  funcao: string;
  estado: "Activo" | "Bloqueado" | "Pendente";
  ultimoAcesso: string;
}

interface UsersTableProps {
  data: Users[];
  onDelete: (id: string) => void;
}


export function UsersTable({ data, onDelete }: UsersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
 

  const columns: ColumnDef<Users>[] = [
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
      accessorKey: "nome",
      header: "Nome",
      cell: ({ row }) => (
        <div className="font-medium flex items-center gap-2 text-dark">
          <Image
            src={"/user.png"}
            alt={"User Profile"}
            width={1920}
            height={1080}
            className="rounded-full w-12 h-12"
          />{" "}
          {row.original.nome}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "E-mail",
    },
    {
      accessorKey: "funcao",
      header: "Função",
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (
        <div
          className={` ${
            row.original.estado === "Activo" &&
            "border border-green-600 bg-green-500/20 text-green-700 px-2 rounded-full flex w-fit items-center justify-center"
          }`}>
          <p>{row.original.estado}</p>
        </div>
      ),
    },
    {
      accessorKey: "ultimoAcesso",
      header: "Último Acesso",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 rounded hover:bg-gray-100 ">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("Ver", row.original)}>
              Ver
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Baixar", row.original)}>
              Baixar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(row.original.id)}>
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
                  }>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
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
              <TableCell
                colSpan={columns.length}
                className="text-center py-10">
                Nenhuma evidência encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
