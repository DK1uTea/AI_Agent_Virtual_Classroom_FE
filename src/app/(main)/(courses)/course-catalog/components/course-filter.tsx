'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCourseList } from "@/hooks/useCourseList";
import { useAuthStore } from "@/stores/auth-store";
import { useCourseStore } from "@/stores/course-store";
import { CourseCategory, CourseLevel } from "@/types/main-flow";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { set } from "zod";
import { useShallow } from "zustand/shallow";

const CourseFilter = () => {


  const levels: CourseLevel[] = [CourseLevel.BASIC, CourseLevel.MEDIUM, CourseLevel.ADVANCED];

  const categories: CourseCategory[] = [
    CourseCategory.MATH,
    CourseCategory.SCIENCE,
    CourseCategory.ARTS,
    CourseCategory.TECHNOLOGY,
    CourseCategory.ENGLISH,
    CourseCategory.HISTORY,
    CourseCategory.MUSIC,
    CourseCategory.GEOGRAPHY,

    CourseCategory.LITERATURE,
    CourseCategory.CIVIC_EDUCATION,
    CourseCategory.PHYSICAL_EDUCATION,
  ];

  const {
    accessToken,
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));

  const {
    currentLimit,
  } = useCourseStore(useShallow((state) => ({
    currentLimit: state.currentLimit,
  })));

  const [queryFormData, setQueryFormData] = useState<{
    accessToken: string;
    title?: string;
    category?: string;
    level?: string;
    limit?: number;
    sort?: string;
    sortBy?: string;
  }>({
    accessToken,
    title: '',
    category: '',
    level: '',
    limit: currentLimit,
    sort: 'desc',
    sortBy: 'createdAt',
  })

  const {
    refetch: refetchCourseList,
    isLoading,
  } = useCourseList(queryFormData);

  const debouncedSearch = useDebounceCallback((value: string) => {
    refetchCourseList();
  }, 500)

  useEffect(() => {
    refetchCourseList();
  }, [queryFormData.category, queryFormData.level, queryFormData.sort, queryFormData.sortBy, queryFormData.limit])

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setQueryFormData((prev) => ({ ...prev, title: val }));
    debouncedSearch(val);
  }

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-10 bg-input-background"
              value={queryFormData.title}
              onChange={handleSearchInputChange}
              disabled={isLoading}
            />
          </div>
          {/* Category Filter */}
          <Select
            onValueChange={(value) => {
              setQueryFormData((prev) => ({ ...prev, category: value }));
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All categories</SelectItem>
              {
                categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          {/* Level Filter */}
          <Select
            onValueChange={(value) => {
              setQueryFormData((prev) => ({ ...prev, level: value }))
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All levels</SelectItem>
              {
                levels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          {/* Sort */}
          <Select
            onValueChange={(value) => {
              if (value === 'newest') {
                setQueryFormData((prev) => ({ ...prev, sortBy: 'desc' }))
              }
              if (value === 'oldest') {
                setQueryFormData((prev) => ({ ...prev, sortBy: 'asc' }))
              }
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
          {/* Limit */}
          <Select
            onValueChange={(value) => {
              setQueryFormData((prev) => ({ ...prev, limit: Number(value) }))
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseFilter;