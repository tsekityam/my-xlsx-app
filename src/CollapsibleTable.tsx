import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Row } from "./Row";
import { IEmployeeData } from "./data";

export default function CollapsibleTable(props: {data: IEmployeeData[]}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Employee First Name</TableCell>
            <TableCell>Employee Last Name</TableCell>
            <TableCell>Employee Number</TableCell>
            <TableCell>Employee Benefit Class</TableCell>
            <TableCell>Employee Occupation Class</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <Row key={row["Employee Number"]} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
