import { createContext, useContext } from "react";
import type { DateRange } from "@/components/layout/DateRangeSelector";

interface DateRangeContextValue {
  range: DateRange;
  setRange: (range: DateRange) => void;
}

const DateRangeContext = createContext<DateRangeContextValue>({
  range: "7d",
  setRange: () => {},
});

export const DateRangeProvider = DateRangeContext.Provider;
export const useDateRange = () => useContext(DateRangeContext).range;
export const useDateRangeContext = () => useContext(DateRangeContext);
