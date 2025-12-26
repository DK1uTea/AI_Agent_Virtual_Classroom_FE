'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ActivityLogItem from "./activity-log-item";
import { ActivityLog } from "@/types/main-flow";
import { useEffect, useState } from "react";
import ActivityDetailDialog from "./activity-detail-dialog";
import { useAuthStore } from "@/stores/auth-store";
import { useShallow } from "zustand/shallow";
import { useGetReportActivity } from "@/hooks/useDashboard";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const ActivityTab = () => {
  const [selectedLog, setSelectedLog] = useState<{
    time: string;
    activity: string;
    details: string;
    lessonId: number | string;
    courseId: number | string;
  } | null>(null);

  const {
    accessToken,
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })))

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [activityLogs, setActivityLogs] = useState<{
    time: string;
    activity: string;
    details: string;
    lessonId: number | string;
    courseId: number | string;
  }[]>([]);

  const reportActivityQuery = useGetReportActivity({
    accessToken: accessToken,
    page: page,
    limit: limit,
  })

  const maxVisiblePages = 5;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setPage(page);
  };

  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];

    let start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('ellipsis');
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('ellipsis');
      }
      pages.push(totalPages);
    }

    return pages;
  }


  useEffect(() => {
    if (reportActivityQuery.data) {
      setActivityLogs(reportActivityQuery.data.items);
      setTotalItems(reportActivityQuery.data.total);
      setTotalPages(reportActivityQuery.data.totalPages);
    }
  }, [reportActivityQuery.data])


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Detailed history of your learning activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLogs.map((log, index) => (
                <ActivityLogItem
                  key={`${log.activity}-${index}`}
                  index={index}
                  log={log}
                  setSelectedLog={setSelectedLog}
                />
              ))}
            </TableBody>
          </Table>
          <div className="w-full flex items-center justify-center mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                    aria-disabled={page === 1}
                  />
                </PaginationItem>
                {getVisiblePages().map((p, index) =>
                  p === 'ellipsis' ? (
                    <PaginationItem key={`e-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                    : (
                      <PaginationItem key={p} >
                        <PaginationLink
                          isActive={p === page}
                          onClick={() => handlePageChange(p)}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(page + 1)}
                    aria-disabled={page === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
      <ActivityDetailDialog
        selectedLog={selectedLog}
        setSelectedLog={setSelectedLog}
      />
    </>
  );
}

export default ActivityTab;