import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import * as React from "react";

interface MarkdownComponentProps {
  node?: any;
  children?: React.ReactNode;
  [key: string]: any;
}

// Custom components for styling react markdown
const components = {
  h1: ({ node, ...props }: MarkdownComponentProps) => <Typography variant="h1" {...props} sx={{ textWrap: "wrap" }} />,
  h2: ({ node, ...props }: MarkdownComponentProps) => <Typography variant="h2" {...props} sx={{ textWrap: "wrap" }}/>,
  p: ({ node, ...props }: MarkdownComponentProps) => <Typography variant="body1" {...props} sx={{ textWrap: "wrap" }}/>,
  ol: ({ node, ...props }: MarkdownComponentProps) => <Box component="ol" {...props} sx={{ listStyle: "inside", textWrap: "wrap" }} />,
  ul: ({ node, ...props }: MarkdownComponentProps) => <Box component="ul" {...props} sx={{ textWrap: "wrap" }}/>,
};

export { components };
