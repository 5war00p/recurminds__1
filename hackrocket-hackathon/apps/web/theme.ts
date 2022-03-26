import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      "900": "#b71718",
      "800": "#c62424",
      "700": "#d32c2c",
      "600": "#e43631",
      "500": "#f34032",
      "400": "#ef514d",
      "300": "#ef9998",
      "200": "#ffccd1",
      "50": "#ffebee",
    },
  },
  components: {},
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: "'Poppins',san-serif",
  },
});

export { theme };
