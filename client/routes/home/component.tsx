import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { getAllFuncs } from "./loader";

function Home() {
  const { headers, rows } = useLoaderData() as Awaited<
    ReturnType<typeof getAllFuncs>
  >;
  const navigate = useNavigate();

  return (
    <div className="m-10">
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
              className="cursor-pointer"
              key={row.name}
              onClick={() => navigate(row.route)}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.method}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex mt-5 justify-center">
        <Button onClick={() => navigate("/new")}>Create</Button>
      </div>
    </div>
  );
}

export default Home;
