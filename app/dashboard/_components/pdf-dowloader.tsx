"use client";

import React from "react";
import PDFPage  from "./pdf-file";
import { Button } from "@/components/ui/button";

import dynamic from "next/dynamic";
import { PDFProps } from '@/types';

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
          <Button size={"lg"} variant={"default"} disabled={loading} className="w-full sm:w-fit my-4">
            {loading ? "Загрузка ..." : "Скачать PDF"}
          </Button>
        )}
      </PDFDownloadLink>
    </>
  );
}

export default PDFDowloader;
