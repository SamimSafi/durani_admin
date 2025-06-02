'use client';
import { Box, Typography } from "@mui/material";
import { Link } from "react-router";

const Footer = () => {
    return (
        <Box sx={{ pt: 6, pb: 3, textAlign: "center" }}>
            <Typography>
                © 2025  All rights reserved by{" "}
                <Link to="#">
                    <Typography color='primary.main' component='span'>
                        Wave Technology</Typography>
                </Link>{" "}
            </Typography>
        </Box>
    );
};

export default Footer;
