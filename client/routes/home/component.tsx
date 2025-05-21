import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  tokens,
} from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { getAllFuncs } from "./loader";

const useStyles = makeStyles({
  container: {
    margin: tokens.spacingVerticalL,
  },
  row: {
    cursor: "pointer",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: tokens.spacingVerticalL,
  },
});

function Home() {
  const classes = useStyles();
  const { headers, rows } = useLoaderData() as Awaited<
    ReturnType<typeof getAllFuncs>
  >;
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHeaderCell key={header}>{header}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              className={classes.row}
              key={row.name}
              onClick={() => navigate(row.route)}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell>{row.restRoute}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.wrapper}>
        <Button onClick={() => navigate("/new")}>Create</Button>
      </div>
    </div>
  );
}

export default Home;
