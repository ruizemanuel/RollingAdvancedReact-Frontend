import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleApply = () => {
    // Maneja la lógica para aplicar el rango de fechas seleccionado
    // Puedes llamar a una función de tu componente principal aquí
  };

  return (
    <div className="custom-date-picker">
      <div className="date-picker-field">
        <label>Desde:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
        />
      </div>
      <div className="date-picker-field">
        <label>Hasta:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
        />
      </div>
      <button onClick={handleApply}>Aplicar</button>
    </div>
  );
}

export default CustomDatePicker;
