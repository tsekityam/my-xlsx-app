import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import React from "react";
import { IEmployeeData } from "./data";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export function Row(props: { row: IEmployeeData }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDown /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row["First Name"]}</TableCell>
        <TableCell>{row["Last Name"]}</TableCell>
        <TableCell>{row["Employee Number"]}</TableCell>
        <TableCell>{row["Benefit Class"]}</TableCell>
        <TableCell>{row["Occupation Class"]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Dependents
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Relationship</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.denpendents.map((dependent) => (
                    <TableRow key={dependent["National ID/Passport No"]}>
                      <TableCell component="th" scope="row">
                        {dependent["First Name"]}
                      </TableCell>
                      <TableCell>{dependent["Last Name"]}</TableCell>
                      <TableCell>{dependent.Relationship}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
