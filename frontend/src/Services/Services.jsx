import { Box } from "@mui/material";
import React from "react";
import ServiceItem from "./ServiceItem";

const SERVICES = [
  {
    id: "s1",
    title: "Gap Analysis",
    description:
      "Gap analysis involves evaluating your current performance to identify areas where it does not meet the required or desired standards. It is a critical process in assessing the difference (or gap) between the existing state and the ideal state.",
      image: '/Gap analysis.jpg',
  },
  {
    id: "s2",
    title: "Documentations",
    description:
      "Documents encompass written, printed, or electronic materials serving as repositories of information or evidence, contributing to the official record and future points of reference. We generate these documents in accordance with the gap assessment report, relevant requirements, and the company's contextual framework. The document types include policies, procedures, instructions, recording formats, inspection checklists, manuals, posters, and warning signs.",
      image: '/documentation.png',
  },
  {
    id: "s3",
    title: "Pre Assessment",
    description:
      "Through a pre-assessment audit, we scrutinize companies' documents, processes, production, systems, and services to gauge their level of conformity with target standards and regulations before undergoing a third-party audit.",
      image: '/Pre-Assessment.webp',
  },
  {
    id: "s4",
    title: "Consultation",
    description:
      "Consultation focuses on providing expert advice and support to bridge the identified gaps. After completing the gap analysis, a consultation process helps organizations address these gaps by developing and implementing strategies for improvement.",
      image: '/consultation.jpeg',
  },
  {
    id: "s5",
    title: "Surveillance Audit",
    description:
      "A Surveillance Audit is an ongoing audit process designed to monitor an organization’s performance over time to ensure continuous compliance with standards, regulations, or certifications. It typically follows an initial or certification audit and is conducted periodically, often annually or semi-annually. The purpose of a surveillance audit is to ensure that the organization continues to meet the established requirements and to identify any areas for improvement.",
      image: '/audit.jpg',
  },
  {
    id: "s6",
    title: "Represent Organization",
    description:
      "To represent an organization effectively, it's essential to understand the various aspects that define its identity, values, and goals. This can be done through different mediums such as branding, communication, and internal structure.",
      image: '/represent.jpg',
  },
  {
    id: "s7",
    title: "Corrective Actions",
    description:
      "Corrective Actions are steps taken to address issues, nonconformities, or problems identified in a process, product, or system in order to bring it into compliance with established standards, requirements, or specifications. The goal of corrective actions is to eliminate the causes of the issues and prevent their recurrence. They are a key component of quality management systems, risk management, and continuous improvement practices.",
    image: '/Corrective-Action.jpg',
  },

  {
    id: "s8",
    title: "Training",
    description:
      "Training is a structured program or series of activities designed to improve knowledge, skills, and abilities. Effective training empowers individuals and teams to perform tasks to their highest potential and supports organizational goals by enhancing competencies, compliance, and productivity.",
      image: '/training.jpg',
  },
];

const Services = () => {
  return (
    <Box
      bgcolor="#e0ffff"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      width="100%"
      height="10%"
    >
      {SERVICES.map((service, index) => (
        <ServiceItem
          title={service.title}
          description={service.description}
          img={service.image}
          key={index}
          swap={index % 2 === 0}
        />
      ))}
    </Box>
  );
};

export default Services;
