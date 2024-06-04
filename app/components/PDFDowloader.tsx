"use client";

// import { PDFDownloadLink } from '@react-pdf/renderer';
import React from "react";
import PDFPage, { PDFProps } from "../dashboard/pdf/page";
import { Button } from "@/components/ui/button";

import dynamic from "next/dynamic";
import { Database } from "@/utils/database.types";

function PDFDowloader({ project, rooms }: PDFProps) {
  const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    },
  );

  return (
    <>
      <PDFDownloadLink
        onClick={() => {}}
        document={<PDFPage project={project} rooms={rooms} key={project.id} />}
        fileName="Техническое задание.pdf"
      >
        {({ blob, url, loading, error }) => (
          <Button size={"lg"} variant={"default"} className="/w-full my-4">
            {loading ? "Загрузка ..." : "Скачать PDF"}
          </Button>
        )}
      </PDFDownloadLink>
    </>
  );
}

export default PDFDowloader;
