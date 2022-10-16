import React, { ChangeEventHandler } from "react";
import "./FilterBar.css";

const numberResultsOptions = [25,50,100,200];

interface IFilterBarProps {
  date: number;
  onDateChange: (newDate: number) => void;
  numberResults: number;
  onNumberResultsChange: (newNumResults: number) => void;
}

export const FilterBar: React.FunctionComponent<IFilterBarProps> = ({ date, onDateChange, numberResults, onNumberResultsChange}) => {
  const handleDateChange: ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
    if (e.target.valueAsDate === null) {
      return;
    }
    const datetime = new Date(`${e.target.value} 01:00:00`).getTime();
    // Datepicker value is in format YYYY-MM-DD, but that ends up as previous day unless you set the time to be positive.
    onDateChange(datetime);
  }, [onDateChange]);
  const dateString = React.useMemo(() => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
  }, [date]);
  const handleNumberResultsChange: ChangeEventHandler<HTMLSelectElement> = React.useCallback((e) => {
    const value = Number.parseInt(e.target.value);
    if (Number.isNaN(value)) {
      return;
    }
    onNumberResultsChange(value);
  }, [onNumberResultsChange]);
  return <form className="wn-filter-bar">
    <label>
      <span>Date</span>
      <input type="date" value={dateString} onChange={handleDateChange} />
    </label>
    <label>
      <span>Number of Results</span>
      <select value={numberResults} onChange={handleNumberResultsChange}>
        {numberResultsOptions.map((numResultsOption) => <option key={numResultsOption} value={numResultsOption}>{numResultsOption}</option>)}
      </select>
    </label>
  </form>;
}
