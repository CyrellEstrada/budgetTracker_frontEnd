import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from "@mui/material";
import BasicModal from "./AddButton";

const BudgetDashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        // Only fetch budgets if authenticated
        if (!isAuthenticated) return;
        // Notice we now call getAccessTokenSilently() as a function.
        const token = await getAccessTokenSilently();
        const res = await fetch(`http://localhost:4001/budget/${user.sub}`, {
          headers: {
            // Use backticks for a template literal so the token is inserted correctly
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        const data = await res.json();
        setBudgets(data);
      } catch (error) {
        console.error("Failed to fetch budgets:", error);
      }
    };

    fetchBudgets();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  // Conditionally return early if the user is not authenticated
  if (!isAuthenticated) {
    return <div>Please log in to view your dashboard.</div>;
  }

  // Only reaches here if isAuthenticated is true
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Welcome to your Dashboard</h1>
      <TableContainer component={Paper} sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Budget ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Savings Goal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ textAlign: "left" }}>
                <BasicModal />
              </TableCell>
            </TableRow>
            {budgets.length > 0 ? (
              budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell>{budget.id}</TableCell>
                  <TableCell>{budget.user_id}</TableCell>
                  <TableCell>{budget.savings_goal}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No budgets found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <BasicModal sx={{ alignContent: "left" }} />
    </Box>
  );
};

export default BudgetDashboard;