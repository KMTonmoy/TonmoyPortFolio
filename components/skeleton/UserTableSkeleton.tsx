 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserTableSkeletonProps } from "@/types/manageuser.types";

export const UserTableSkeleton = ({ rows = 5 }: UserTableSkeletonProps) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
      <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="h-6 w-32 bg-muted rounded"></div>
          <div className="h-4 w-48 bg-muted rounded mt-1"></div>
        </div>
        <div className="h-10 w-64 bg-muted rounded-lg"></div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><div className="h-4 w-16 bg-muted rounded"></div></TableHead>
              <TableHead><div className="h-4 w-16 bg-muted rounded"></div></TableHead>
              <TableHead><div className="h-4 w-16 bg-muted rounded"></div></TableHead>
              <TableHead><div className="h-4 w-16 bg-muted rounded"></div></TableHead>
              <TableHead><div className="h-4 w-16 bg-muted rounded"></div></TableHead>
              <TableHead className="text-right"><div className="h-4 w-16 bg-muted rounded ml-auto"></div></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted"></div>
                    <div className="h-4 w-24 bg-muted rounded"></div>
                  </div>
                </TableCell>
                <TableCell><div className="h-4 w-32 bg-muted rounded"></div></TableCell>
                <TableCell><div className="h-6 w-16 bg-muted rounded-full"></div></TableCell>
                <TableCell><div className="h-6 w-16 bg-muted rounded-full"></div></TableCell>
                <TableCell><div className="h-4 w-24 bg-muted rounded"></div></TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-8 w-8 bg-muted rounded-lg"></div>
                    <div className="h-8 w-8 bg-muted rounded-lg"></div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-border">
        <div className="h-4 w-48 bg-muted rounded"></div>
      </div>
    </div>
  );
};