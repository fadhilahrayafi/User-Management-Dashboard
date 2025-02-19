import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import UserTable from "../components/UserTable";
import { fetchUsers } from "../redux/slices/userSlice";

// Mock API response
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", company: { name: "Acme Inc." } },
  { id: 2, name: "Jane Doe", email: "jane@example.com", company: { name: "Tech Corp." } },
];

jest.mock("../redux/slices/userSlice", () => ({
  ...jest.requireActual("../redux/slices/userSlice"),
  fetchUsers: jest.fn(),
}));

jest.mock("@chakra-ui/core", () => {
    const ui = jest.requireActual("@chakra-ui/core");
    return {
        ...ui,
        customKey: 'customValue',
    };
})

describe("UserTable Component", () => {
  it("renders the table and loads users", async () => {
    (fetchUsers as unknown as jest.Mock).mockResolvedValue(mockUsers);

    render(
      <Provider store={store}>
        <UserTable />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("shows loading spinner while fetching", () => {
    render(
      <Provider store={store}>
        <UserTable />
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("allows deleting a user", async () => {
    (fetchUsers as unknown as jest.Mock).mockResolvedValue(mockUsers);

    render(
      <Provider store={store}>
        <UserTable />
      </Provider>
    );

    await screen.findByText("John Doe");

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => expect(screen.queryByText("John Doe")).not.toBeInTheDocument());
  });
});