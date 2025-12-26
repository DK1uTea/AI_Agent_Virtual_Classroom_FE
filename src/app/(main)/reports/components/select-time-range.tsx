'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type SelectTimeRangeProps = {
  timeRange: string;
  setTimeRange: (range: string) => void;
};

const SelectTimeRange = ({ timeRange, setTimeRange }: SelectTimeRangeProps) => {

  return (
    <Select value={timeRange} onValueChange={setTimeRange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7d">Last 7 days</SelectItem>
        <SelectItem value="30d">Last 30 days</SelectItem>
        <SelectItem value="all">All</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectTimeRange;