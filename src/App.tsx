import React from "react";
import "./App.css";
import { Button } from "@material-ui/core";
import XLSX from "xlsx";
import CollapsibleTable from "./CollapsibleTable";
import { IEmployeeRow, parseEmployeeRows } from "./data";

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
                    var result: IEmployeeRow[] = XLSX.utils.sheet_to_json(
                      workbook.Sheets[sheetName]
                    );
                    parseEmployeeRows(result);
                  });
                };
              }
            }}
          />
        </Button>
      </header>
      <CollapsibleTable />
    </div>
  );
}

export default App;
