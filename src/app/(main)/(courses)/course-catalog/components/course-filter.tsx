'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetCourseList } from "@/hooks/useGetCourseList";
import { useAuthStore } from "@/stores/auth-store";
import { useCourseStore } from "@/stores/course-store";
import { CourseCategory, CourseLevel, SortOrder } from "@/types/main-flow";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
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
    currentListConfig,
    setCurrentListConfig,
  } = useCourseStore(useShallow((state) => ({
    currentListConfig: state.currentListConfig,
    setCurrentListConfig: state.setCurrentListConfig,
  })));


  const {
    isLoading,
  } = useGetCourseList({
    accessToken,
    ...currentListConfig,
  });

  const [searchInput, setSearchInput] = useState<string>('');

  const debouncedSearch = useDebounceCallback((value: string) => {
    setCurrentListConfig((prev) => ({ ...prev, title: value, page: 1 }));
  }, 1500)

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setSearchInput(val);
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
              value={searchInput}
              onChange={handleSearchInputChange}
              disabled={isLoading}
            />
          </div>
          {/* Category Filter */}
          <Select
            onValueChange={(value) => {
              setCurrentListConfig((prev) => ({ ...prev, category: value === '__all' ? "" : value }));
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all">All categories</SelectItem>
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
              setCurrentListConfig((prev) => ({ ...prev, level: value === '__all' ? "" : value }));
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all">All levels</SelectItem>
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
              setCurrentListConfig((prev) => ({ ...prev, sortOrder: value as SortOrder }))
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={SortOrder.DESC}>Newest</SelectItem>
              <SelectItem value={SortOrder.ASC}>Oldest</SelectItem>
            </SelectContent>
          </Select>
          {/* Limit */}
          <Select
            onValueChange={(value) => {
              setCurrentListConfig((prev) => ({ ...prev, limit: Number(value) }))
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