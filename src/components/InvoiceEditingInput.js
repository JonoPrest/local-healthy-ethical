import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

const InvoiceEditingInput = ({ initialValue, name, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <Input
      style={{ maxWidth: "100px", minWidth: "63px", padding: "2px" }}
      name={name}
      className="mx-1"
      type="text"
      value={inputValue}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default InvoiceEditingInput;
