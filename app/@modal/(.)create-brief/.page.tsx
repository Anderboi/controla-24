import CreateBrief from "@/app/create-brief/page";
import Modal from "@/components/ui/modal";
import React from "react";

function page() {
  return (
    <section>
      <Modal>
        <CreateBrief />
      </Modal>
    </section>
  );
}

export default page;
