import Box from "@mui/material/Box";
import {

  DataGrid,
  GridColDef,

} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "name", headerName: "Item", width: 180, editable: true },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 180,
    align: "left",
    headerAlign: "left",
    editable: true,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
  },
];

export function InventorySkeleton() {
  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        loading
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        columns={columns}
      />
    </Box>
  );
}
