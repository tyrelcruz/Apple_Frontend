import React from "react";
import { Box, Typography, Grid, Card, CardContent, Paper } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "../../styles/ReportsPage.css";

const revenueData = [
  { name: "iPhone", value: 51.3, fill: "#0071e3" },
  { name: "Mac", value: 10.4, fill: "#34c759" },
  { name: "iPad", value: 7.6, fill: "#ff9500" },
  { name: "Wearables", value: 10.9, fill: "#5856d6" },
  { name: "Services", value: 23.9, fill: "#ff2d55" },
];

const regionData = [
  { name: "Americas", value: 42.1, fill: "#0071e3" },
  { name: "Europe", value: 25.0, fill: "#34c759" },
  { name: "China", value: 18.8, fill: "#ff9500" },
  { name: "Japan", value: 7.2, fill: "#5856d6" },
  { name: "Rest of APAC", value: 6.9, fill: "#ff2d55" },
];

const ReportsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Reports Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          Reports & Analytics
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Track your content performance and engagement metrics
        </Typography>
      </Box>

      {/* Revenue Charts Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
          }}
        >
          Revenue Analysis
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Product Revenue (Q2 2024)
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fill: "#333" }} />
                      <YAxis unit="B" tick={{ fill: "#333" }} />
                      <Tooltip
                        formatter={(value) => [`$${value}B`, "Revenue"]}
                      />
                      <Bar dataKey="value" name="Revenue">
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Regional Revenue Distribution
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`$${value}B`, "Revenue"]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
          }}
        >
          Quarterly Revenue Trends
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Revenue in Billions (USD)
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
              "& > div": {
                p: 2,
                textAlign: "center",
                borderBottom: "1px solid",
                borderColor: "divider",
              },
            }}
          >
            <Box sx={{ fontWeight: "bold", bgcolor: "action.hover" }}>
              Quarter
            </Box>
            <Box sx={{ fontWeight: "bold", bgcolor: "action.hover" }}>
              iPhone
            </Box>
            <Box sx={{ fontWeight: "bold", bgcolor: "action.hover" }}>
              Services
            </Box>
            <Box sx={{ fontWeight: "bold", bgcolor: "action.hover" }}>
              Total
            </Box>

            <Box>Q1 2024</Box>
            <Box>$69.7B</Box>
            <Box>$23.1B</Box>
            <Box>$119.6B</Box>

            <Box>Q2 2024</Box>
            <Box>$51.3B</Box>
            <Box>$23.9B</Box>
            <Box>$94.8B</Box>

            <Box>Q3 2023</Box>
            <Box>$39.7B</Box>
            <Box>$21.2B</Box>
            <Box>$81.8B</Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ReportsPage;
