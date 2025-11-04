import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ja } from "date-fns/locale/ja";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { startOfWeek, format } from "date-fns";

type DateSelectorProps = {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  mode: "daily" | "weekly" | "monthly";
};

const DateSelector: React.FC<DateSelectorProps> = ({
  selected,
  onChange,
  mode,
}) => {
  registerLocale("ja", ja);

  const minDate = new Date(2025, 5, 30);
  const maxDateDaily = new Date();
  maxDateDaily.setDate(maxDateDaily.getDate() - 1);
  const maxDateWeekly = startOfWeek(maxDateDaily, { weekStartsOn: 0 });

  const startDate = startOfWeek(selected ?? new Date(), {
    weekStartsOn: 1,
  });
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  const dateFormatWeekly = `${format(startDate, "yyyy年MM月dd日")} ~ ${format(
    endDate,
    "yyyy年MM月dd日"
  )}`;

  const pickerProps =
    mode === "monthly"
      ? { showMonthYearPicker: true, dateFormat: "yyyy年MM月" }
      : mode === "weekly"
      ? {
          showWeekPicker: true,
          dateFormat: dateFormatWeekly,
          showWeekNumbers: true,
          maxDate: maxDateWeekly,
        }
      : {
          dateFormat: "yyyy年MM月dd日",
          maxDate: maxDateDaily,
        };

  /** カスタムボタン */
  const FaCalendarIcon = FaCalendarAlt as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const CustomButton = React.forwardRef<HTMLButtonElement, any>(
    ({ value, onClick }, ref) => (
      <button
        type="button"
        onClick={onClick}
        ref={ref}
        className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <FaCalendarIcon className="text-blue-500" />
        <span>{value || "日付を選択"}</span>
      </button>
    )
  );

  return (
    <div className="text-center sm:text-right mx-4 mt-4">
      <DatePicker
        selected={selected}
        onChange={onChange}
        locale="ja"
        calendarStartDay={1}
        minDate={minDate}
        {...pickerProps}
        customInput={<CustomButton />}
      />
    </div>
  );
};

export default DateSelector;
