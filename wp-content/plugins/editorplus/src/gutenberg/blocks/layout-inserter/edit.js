import React from "react";
import Introduction from "./components/introduction";
import Directory from "./components/directory";
import DirectoryHeader from "./components/directory-header";
import { TEXT_DOMAIN } from "../../global/constants";

const { __ } = wp.i18n;
const { Modal } = wp.components;
const { useState } = wp.element;

function edit(props) {
  const [directory, setDirectory] = useState(false);

  const closeDirectory = () => setDirectory(false);
  const openDirectory = () => setDirectory(true);

  return (
    <div>
      <Introduction onRequestSelection={openDirectory} />
      {directory && (
        <Modal
          title={<DirectoryHeader />}
          isDismissible={false}
          className="ep-td-modal"
          onRequestClose={closeDirectory}
        >
          <Directory {...props} />
        </Modal>
      )}
    </div>
  );
}

export default edit;
