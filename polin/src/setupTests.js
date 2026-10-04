import "@testing-library/jest-dom";

// Mock react-pdf webpack entry for Jest compatibility
jest.mock("react-pdf/dist/esm/entry.webpack", () => ({
  Document: ({ children }) => <div data-testid="pdf-document">{children}</div>,
  Page: () => <div data-testid="pdf-page" />,
  pdfjs: { GlobalWorkerOptions: {} },
}));

