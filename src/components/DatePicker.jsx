import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker({ onDateChange }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <div className="d-flex justify-content-end">
      <DatePicker
      wrapperClassName="wider-input"
      placeholderText="Filtrar por fechas"
      dateFormat="dd/MM/yyyy"
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
        if (onDateChange) {
          onDateChange(update);
        }
      }}
      isClearable={true}
    />
    </div>
    
  );
};

export default CustomDatePicker;
