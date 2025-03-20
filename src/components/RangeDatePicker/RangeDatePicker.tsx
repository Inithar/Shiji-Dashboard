import React from "react";
import { CalendarIcon } from "lucide-react";
import { DayPicker, DateRange, PropsRange } from "react-day-picker";
import { pl } from "react-day-picker/locale";

import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover.tsx";

import { formatDate } from "../../utils/dateFormatters.ts";

import "react-day-picker/style.css";
import styles from "./RangeDatePicker.module.css";

interface DatepickerProps extends Omit<PropsRange, "mode"> {
  label: string;
  numberOfMonths?: number | undefined;
}

const RangeDatePicker: React.FC<DatepickerProps> = ({ label, selected, onSelect, ...props }) => {
  function getButtonContent(selected: DateRange | undefined) {
    if (selected?.from && selected?.to) {
      return `${formatDate(selected.from.toString())} - ${formatDate(selected.to.toString())}`;
    }

    return "";
  }

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="arrival-departure-date">
        {label}
      </label>

      <Popover>
        <PopoverTrigger asChild>
          <button className={styles.triggerButton} id="arrival-departure-date" type="button">
            <CalendarIcon aria-hidden="true" />
            {getButtonContent(selected)}
          </button>
        </PopoverTrigger>

        <PopoverContent>
          <DayPicker
            className={styles.rdpRoot}
            mode="range"
            locale={pl}
            selected={selected}
            onSelect={onSelect}
            showOutsideDays
            {...props}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RangeDatePicker;
