import { createContext, useContext } from "react";
import type { DateRange } from "@/components/layout/DateRangeSelector";

const DateRangeContext = createContext<DateRange>("7d");

export const DateRangeProvider = DateRangeContext.Provider;
export const useDateRange = () => useContext(DateRangeContext);
