import { Box, Typography } from "@mui/material";
import * as React from "react";

// Custom components for styling react markdown
const components = {
  h1: ({ node, ...props }) => <Typography variant="h1" {...props} sx={{ textWrap: "wrap" }} />,
  h2: ({ node, ...props }) => <Typography variant="h2" {...props} sx={{ textWrap: "wrap" }}/>,
  p: ({ node, ...props }) => <Typography variant="body1" {...props} sx={{ textWrap: "wrap" }}/>,
  ol: ({ node, ...props }) => <Box component="ol" {...props} sx={{ listStyle: "inside", textWrap: "wrap" }} />,
  ul: ({ node, ...props }) => <Box component="ul" {...props} sx={{ textWrap: "wrap" }}/>,
};

export { components };
