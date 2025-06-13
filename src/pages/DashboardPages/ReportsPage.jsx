import React from "react";
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
import { Grid, Card, CardContent, Typography } from "@mui/material";
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
    <div className="reports-container apple-reports">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" className="chart-title">
                Product Revenue (Q2 2024)
              </Typography>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fill: "#333" }} />
                    <YAxis unit="B" tick={{ fill: "#333" }} />
                    <Tooltip formatter={(value) => [`$${value}B`, "Revenue"]} />
                    <Bar dataKey="value" name="Revenue">
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" className="chart-title">
                Regional Revenue Distribution
              </Typography>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
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
                    <Tooltip formatter={(value) => [`$${value}B`, "Revenue"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div className="quarterly-trends">
        <Typography variant="h5" className="section-title">
          Quarterly Revenue Trends (Billions)
        </Typography>
        <div className="trend-grid">
          <div className="trend-header">Quarter</div>
          <div className="trend-header">iPhone</div>
          <div className="trend-header">Services</div>
          <div className="trend-header">Total</div>

          <div className="trend-item">Q1 2024</div>
          <div className="trend-item">$69.7B</div>
          <div className="trend-item">$23.1B</div>
          <div className="trend-item">$119.6B</div>

          <div className="trend-item">Q2 2024</div>
          <div className="trend-item">$51.3B</div>
          <div className="trend-item">$23.9B</div>
          <div className="trend-item">$94.8B</div>

          <div className="trend-item">Q3 2023</div>
          <div className="trend-item">$39.7B</div>
          <div className="trend-item">$21.2B</div>
          <div className="trend-item">$81.8B</div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
