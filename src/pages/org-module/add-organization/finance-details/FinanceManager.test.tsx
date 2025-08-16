import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useTranslation } from "react-i18next";
import FinanceManager from "./FinanceManager";

import '@testing-library/jest-dom';
import { usePostFinanceMangerDetailsMutation } from "../../../../store/musafirOrgApi"; // Mock this API call

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("../../../../store/musafirOrgApi", () => ({
  usePostFinanceMangerDetailsMutation: jest.fn(),
}));

const mockStore = configureStore([]);
const initialState = {
  orgSlice: {
    addfinaceManagerData: { entityId: "12345" },
  },
};

(useTranslation as jest.Mock).mockReturnValue({
  t: (key: string) => key, // Simple mock for translation function
});

describe("FinanceManager Component", () => {
  let store: any;
  let postFinanceManagerMock: jest.Mock;

  beforeEach(() => {
    store = mockStore(initialState);
    postFinanceManagerMock = jest.fn();
    (usePostFinanceMangerDetailsMutation as jest.Mock).mockReturnValue([postFinanceManagerMock, { isLoading: false }]);
  });

  test("renders the form with all fields", () => {
    render(
      <Provider store={store}>
        <FinanceManager activeStep={0} setActiveStep={jest.fn()} />
      </Provider>
    );

    // Verify main title
    expect(screen.getByText("create_your_organization")).toBeInTheDocument();

    // Verify section title
    expect(screen.getByText("finance_manager_details")).toBeInTheDocument();

    // Verify all input fields render
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone_no/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job_title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/recive_copy/i)).toBeInTheDocument();

    // Verify buttons render
    expect(screen.getByText("back")).toBeInTheDocument();
    expect(screen.getByText("Save_and_Continue")).toBeInTheDocument();
  });

  test("renders validation error messages on blur without input", async () => {
    render(
      <Provider store={store}>
        <FinanceManager activeStep={0} setActiveStep={jest.fn()} />
      </Provider>
    );

    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.click(nameInput);
    await userEvent.tab(); // Move focus away from the input field
    expect(await screen.findByText("val_name_required")).toBeInTheDocument();
  });

  test("renders dropdown options for receiveEmails field", async () => {
    render(
      <Provider store={store}>
        <FinanceManager activeStep={0} setActiveStep={jest.fn()} />
      </Provider>
    );

    const dropdown = screen.getByLabelText(/recive_copy/i);
    await userEvent.click(dropdown);

    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  test("Save and Continue button should be enabled after form submission", async () => {
    render(
      <Provider store={store}>
        <FinanceManager activeStep={0} setActiveStep={jest.fn()} />
      </Provider>
    );

    const button = screen.getByText("Save_and_Continue");
    expect(button).not.toBeDisabled();
  });

  test("form submits successfully", async () => {
    render(
      <Provider store={store}>
        <FinanceManager activeStep={0} setActiveStep={jest.fn()} />
      </Provider>
    );

    // Fill in the form
    await userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    await userEvent.type(screen.getByLabelText(/email/i), "john.doe@example.com");
    await userEvent.type(screen.getByLabelText(/phone_no/i), "1234567890");
    await userEvent.type(screen.getByLabelText(/job_title/i), "Finance Manager");
    await userEvent.type(screen.getByLabelText(/address/i), "123 Street, City");

    // Submit the form
    const submitButton = screen.getByText("Save_and_Continue");
    await userEvent.click(submitButton);

    // Check that the mock API function was called
    await waitFor(() => expect(postFinanceManagerMock).toHaveBeenCalledTimes(1));
    expect(postFinanceManagerMock).toHaveBeenCalledWith({
      entityId: "12345",
      organizationId: 0,
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      jobTitle: "Finance Manager",
      address: "123 Street, City",
      receiveEmailCopy: true, // Default value of "Yes"
    });
  });

  test("form shows loading state while submitting", async () => {
    postFinanceManagerMock.mockReturnValueOnce([jest.fn(), { isLoading: true }]);

    render(
      <Provider store={store}>
        <FinanceManager activeStep={0} setActiveStep={jest.fn()} />
      </Provider>
    );

    // Check if the loading screen is visible
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("handles error in form submission", async () => {
    postFinanceManagerMock.mockRejectedValueOnce(new Error("Network error"));

    render(
      <Provider store={store}>
        <FinanceManager activeStep={0} setActiveStep={jest.fn()} />
      </Provider>
    );

    // Fill in the form
    await userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    await userEvent.type(screen.getByLabelText(/email/i), "john.doe@example.com");
    await userEvent.type(screen.getByLabelText(/phone_no/i), "1234567890");
    await userEvent.type(screen.getByLabelText(/job_title/i), "Finance Manager");
    await userEvent.type(screen.getByLabelText(/address/i), "123 Street, City");

    const submitButton = screen.getByText("Save_and_Continue");
    await userEvent.click(submitButton);

    // Check for error notification
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });
});