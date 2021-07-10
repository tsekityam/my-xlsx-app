import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@material-ui/core";
import XLSX from "xlsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Upload .XLSX that contains employee information
        </p>
        <Button color="primary" variant="contained" component="label">
          Upload File
          <input
            hidden
            type="file"
            // accept="application/vnd.ms-excel"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.files) {
                const reader = new FileReader();
                reader.readAsBinaryString(event.target.files[0]);
                reader.onload = function (e) {
                  const data = e.target?.result;
                  const workbook = XLSX.read(data, {
                    type: "binary",
                  });
                  workbook.SheetNames.forEach(function (sheetName) {
                    var result = XLSX.utils.sheet_to_json(
                      workbook.Sheets[sheetName]
                    );
                    console.log(result);
                  });
                };
              }
            }}
          />
        </Button>
      </header>
    </div>
  );
}

export default App;
