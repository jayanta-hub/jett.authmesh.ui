import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import JourneySectorSection from "./JourneySectorSection";
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
      <div data-testid={`mock-dropdown-${label.replace(" ", "").toLowerCase()}`}>
        <p>{label}</p>
        <p>{placeholder}</p>
        <button
          data-testid={`mock-select-button-${label.replace(" ", "").toLowerCase()}`}
          onClick={() => onChange([`${label}1`, `${label}2`])}
        >
          Mock Select {label}
        </button>
        <div data-testid={`selected-values-${label.replace(" ", "").toLowerCase()}`}>
          {selectedValues.join(", ")}
        </div>
        <div data-testid={`options-${label.replace(" ", "").toLowerCase()}`}>
          {options.join(", ")}
        </div>
      </div>
    ),
  })
);

const renderComponent = (overrideProps = {}, isMobile = false) => {
  const defaultProps = {
    selectedJourneyTypes: [],
    allJourneyTypes: ["One Way", "Round Trip"],
    setSelectedJourneyTypes: jest.fn(),
    selectedSections: [],
    allSections: ["North", "South"],
    setSelectedSections: jest.fn(),
  };

  mockUseMediaQuery.mockImplementation(() => isMobile);

  return render(
    <ThemeProvider theme={theme}>
      <JourneySectorSection {...defaultProps} {...overrideProps} />
    </ThemeProvider>
  );
};

describe("JourneySectorSection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Journey Type and Sector section titles and descriptions (desktop)", () => {
    renderComponent({}, false);

    expect(screen.getAllByText("Journey Type")).toHaveLength(2); 
    expect(screen.getAllByText("Sector")).toHaveLength(2); 

    expect(
      screen.getByText(/Sets the Journey Type\(s\) on which this Pricing Policy will be applicable/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sets the Sector\(s\) on which this Pricing Policy will be applicable/)
    ).toBeInTheDocument();
  });



  it("calls setSelectedJourneyTypes when dropdown changes", () => {
    const setSelectedJourneyTypes = jest.fn();
    renderComponent({ setSelectedJourneyTypes });

    const journeyTypeBtn = screen.getByTestId("mock-select-button-journeytype");
    fireEvent.click(journeyTypeBtn);

    expect(setSelectedJourneyTypes).toHaveBeenCalledWith(["Journey Type1", "Journey Type2"]);
  });

  it("calls setSelectedSections when sector dropdown changes", () => {
    const setSelectedSections = jest.fn();
    renderComponent({ setSelectedSections });

    const sectorBtn = screen.getByTestId("mock-select-button-sector");
    fireEvent.click(sectorBtn);

    expect(setSelectedSections).toHaveBeenCalledWith(["Sector1", "Sector2"]);
  });

  it("shows correct selected values", () => {
    renderComponent({
      selectedJourneyTypes: ["One Way", "Round Trip"],
      selectedSections: ["North"],
    });

    expect(screen.getByTestId("selected-values-journeytype")).toHaveTextContent("One Way, Round Trip");
    expect(screen.getByTestId("selected-values-sector")).toHaveTextContent("North");
  });

  it("shows correct options", () => {
    renderComponent();

    expect(screen.getByTestId("options-journeytype")).toHaveTextContent("One Way, Round Trip");
    expect(screen.getByTestId("options-sector")).toHaveTextContent("North, South");
  });
});
