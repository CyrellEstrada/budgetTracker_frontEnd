import React, { useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tab,
    Box
} from '@mui/material'
import BasicModal from './AddButton'


const BudgetDashboard = () => {
    const [budgets, setBudgets] = useState([])
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                if (!isAuthenticated) return
                const token = await getAccessTokenSilently
                const res = await fetch(
                    `http://localhost:4001/budget/${user.sub}`,
                    {
                        headers: {
                            Authorization: 'Bearer ${token}'
                        }
                    }
                )
                if (!res.ok) {
                    throw new Error(`Server error: ${res.status}`)
                }

                const data = await res.json()
                setBudgets(data)
            } catch (error) {
                console.error('Failed to fetch budgets:', error)
            }
        }
        fetchBudgets()
    }, [isAuthenticated, user, getAccessTokenSilently])
    
    return (
        // GET request for user's budget using getAllBudgetsbyUserId or getBudgetById in router backend, use endpoint in router not functions in controllers
        
        //Information that come from GET request save in a variable or state, use MUI element or table, goes in return statment below
        <Box sx={{display: 'flex'}}>
        <h1>Welcome to your Dashboard</h1>
                {/* HTML Form to enter information or MUI Form*/}
        <TableContainer component={Paper} sx={{maxWidth: 600, margin: 'auto', mt: 4}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Budget ID</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>Savings Goal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                <TableRow >
                    <TableCell sx={{textAlign:'left'}}>{<BasicModal />}</TableCell>
                </TableRow>
                    {budgets.map((budget) => (
                        <TableRow key={budget.id}>
                            <TableCell>{budget.id}</TableCell>
                            <TableCell>{budget.user_id}</TableCell>
                            <TableCell>{budget.savings_goal}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <BasicModal sx={{alignContent:'left'}}/>
        </Box>
    )
}

export default BudgetDashboard