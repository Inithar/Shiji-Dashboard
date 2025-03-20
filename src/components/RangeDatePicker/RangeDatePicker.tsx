import React from "react";
import { CalendarIcon } from "lucide-react";
import { DayPicker, DateRange, PropsRange } from "react-day-picker";
import { pl } from "react-day-picker/locale";

import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover.tsx";
import { Label } from "../Label/Label.tsx";

import { formatDate } from "../../utils/dateFormatters.ts";

import "react-day-picker/style.css";
import styles from "./RangeDatePicker.module.css";

interface DatepickerProps extends Omit<PropsRange, "mode"> {
  label: string;
  numberOfMonths?: number | undefined;
  error?: string;
}

const RangeDatePicker: React.FC<DatepickerProps> = ({ label, error, selected, onSelect, ...props }) => {
  const id = React.useId();

  function getButtonContent(selected: DateRange | undefined) {
    if (selected?.from && selected?.to) {
      return `${formatDate(selected.from.toString())} - ${formatDate(selected.to.toString())}`;
    }

    return "";
  }

  return (
    <div className={styles.container}>
      <Label htmlFor={id} isError={Boolean(error)}>
        {label}
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <button
            className={styles.triggerButton}
            id={id}
            type="button"
            aria-describedby={error && `${id}-error`}
            aria-invalid={Boolean(error)}
          >
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

      {error ? (
        <p id={`${id}-error`} className={styles.errorMessage}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default RangeDatePicker;
