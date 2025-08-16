import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ClassFareSection from "./ClassFareSection";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../../../../theme";

jest.mock("@mui/material/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseMediaQuery = require("@mui/material/useMediaQuery").default;

jest.mock(
  "../../../../../../components/core-module/multi-select-dropdown/MultiSelectDropdown",
  () => ({
    __esModule: true,
    default: ({ label, selectedValues, options, onChange, placeholder }: any) => (
      <div data-testid="mock-multiselect">
        <p>{label}</p>
        <p>{placeholder}</p>
        <button data-testid="mock-select-button" onClick={() => onChange(["Economy", "Business"])}>Mock Select</button>
        <div data-testid="selected-values">{selectedValues.join(", ")}</div>
        <div data-testid="options">{options.join(", ")}</div>
      </div>
    ),
  })
);

const setup = (overrideProps = {}, isMobile = false) => {
  const defaultProps = {
    selectedClasses: [],
    allClasses: ["Economy", "Business"],
    setSelectedClasses: jest.fn(),
    fareType: "",
    setFareType: jest.fn(),
    fareTypeError: "",
    fareTypeTouched: false,
    onFareTypeBlur: jest.fn(),
  };

  mockUseMediaQuery.mockImplementation(() => isMobile);

  return render(
    <ThemeProvider theme={theme}>
      <ClassFareSection {...defaultProps} {...overrideProps} />
    </ThemeProvider>
  );
};

describe("ClassFareSection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders titles and descriptions correctly (desktop)", () => {
    setup();

    expect(screen.getAllByText("Class")).toHaveLength(2);
    expect(screen.getAllByText("Fare Type")).toHaveLength(2);

    expect(
      screen.getByText(/Sets the Class\(es\) on which this Pricing Policy will be applicable/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Sets the Fare Type\(s\) on which this Pricing Policy will be applicable/)
    ).toBeInTheDocument();
  });

  it("renders correctly in mobile view", () => {
    setup({}, true); 

    expect(screen.getByText("Class")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter CSV value(s)")).toBeInTheDocument();
  });

  it("calls setSelectedClasses when dropdown changes", () => {
    const setSelectedClasses = jest.fn();
    setup({ setSelectedClasses });

    const button = screen.getByTestId("mock-select-button");
    fireEvent.click(button);

    expect(setSelectedClasses).toHaveBeenCalledWith(["Economy", "Business"]);
  });

  it("handles fareType input transformation", () => {
    const setFareType = jest.fn();
    setup({ setFareType });

    const input = screen.getByPlaceholderText("Enter CSV value(s)");
    fireEvent.change(input, { target: { value: "eco,biz123" } });

    expect(setFareType).toHaveBeenCalledWith("ECO,BIZ");
  });

  it("calls onFareTypeBlur on blur", () => {
    const onFareTypeBlur = jest.fn();
    setup({ onFareTypeBlur });

    const input = screen.getByPlaceholderText("Enter CSV value(s)");
    fireEvent.blur(input);

    expect(onFareTypeBlur).toHaveBeenCalled();
  });

  it("shows no error when untouched", () => {
    setup({ fareTypeTouched: false, fareTypeError: "Error Msg" });

    expect(screen.queryByText("Error Msg")).not.toBeInTheDocument();
  });

  it("shows error only when touched and error exists", () => {
    setup({ fareTypeTouched: true, fareTypeError: "Invalid format" });

    expect(screen.getByText("Invalid format")).toBeInTheDocument();
  });

  it("does not show error when touched but no error exists", () => {
    setup({ fareTypeTouched: true, fareTypeError: "" });

    expect(screen.queryByText(/Invalid format/)).not.toBeInTheDocument();
  });
});
