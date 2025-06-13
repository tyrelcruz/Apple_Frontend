import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../styles/DashboardPage.css";

const trendData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <div className="overview-container">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Unique Viewers
                </Typography>
                <Typography variant="h4" className="card-value">
                  18.97%
                </Typography>
                <Typography
                  variant="subtitle2"
                  className="card-change negative"
                >
                  -18.97% Compared to previous period
                </Typography>
                <div className="chart-placeholder">
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Total Views
                </Typography>
                <Typography variant="h4" className="card-value">
                  22.35%
                </Typography>
                <Typography
                  variant="subtitle2"
                  className="card-change positive"
                >
                  +22.35% Compared to previous period
                </Typography>
                <div className="chart-placeholder">
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="pv" stroke="#34c759" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Average Active Time
                </Typography>
                <Typography variant="h4" className="card-value">
                  28.13%
                </Typography>
                <Typography
                  variant="subtitle2"
                  className="card-change negative"
                >
                  -28.13% Compared to previous period
                </Typography>
                <div className="chart-placeholder">
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="amt" stroke="#ff9500" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DashboardPage;
