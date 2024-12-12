import { Box, Typography } from "@mui/material";
import React from "react";
import AboutItem from "./AboutItem";

const ITEMS = [
  {
    id: "i1",
    title: "About Us",
    description:
      "Mekan Quality Management and Training PLC is a recognized organization registered under the Ethiopia Ministry of Innovation & Technology and the Ministry of Trade. We specialize in delivering high-quality training and consultancy services tailored to meet relevant standards across various sectors, including Food Processing, Agriculture, Manufacturing, and other industries.",
    image: "",
  },
  {
    id: "i1",
    title: "Our Misssion",
    description:
      "Our mission is rooted in a commitment to quality management, ensuring the consistent enhancement of products and services to meet and exceed customer expectations. We embrace a sustainable development approach, balancing diverse needs while considering environmental, social, and economic impacts. At Mekan, we are dedicated to empowering industries with the tools and knowledge to achieve excellence and sustainability.",
    image: "",
  },
];

const AboutUs = () => {
  return (
    <>
      <Typography
        sx={{ textAlign: "center" }}
        fontWeight="bold"
        fontSize={{ lg: 32, md: 28, sm: 24, xs: 20 }}
        color="#734950"
        padding={3}
        variant="h3"
      >
        "Empowering Excellence, Driving Sustainability."
      </Typography>
      <Box
        bgcolor="#e0ffff"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        width="100%"
        height="10%"
      >
        {ITEMS.map((item, index) => (
          <AboutItem
            title={item.title}
            description={item.description}
            img={item.image}
            key={index}
            swap={index % 2 === 0}
          />
        ))}
      </Box>
    </>
  );
};

export default AboutUs;
