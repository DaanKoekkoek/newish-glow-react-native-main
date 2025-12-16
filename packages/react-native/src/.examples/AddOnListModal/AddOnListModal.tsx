import { useRef } from "react";

import { type ModalHandle, AddOnList, Addon, Modal } from "components/index";

export const AddOnListModal = () => {
  const modalRef = useRef<ModalHandle>(null);
  const modalRef2 = useRef<ModalHandle>(null);

  const openModal = () => {
    modalRef.current?.triggerModalOpen();
  };

  const openModal2 = () => {
    modalRef.current?.triggerModalOpen();
  };

  return (
    <>
      <AddOnList
        children={[
          <AddOnList.Item
            key="item"
            title="Item 1"
            variant="added"
            actionLabel="Button"
            addOn={<Addon name="Amazon Prime" size="sm" />}
            onPress={openModal}
          />,
          <AddOnList.Item
            key="item_2"
            title="Item 2"
            variant="added"
            actionLabel="Button"
            addOn={<Addon name="Amazon Prime" size="sm" />}
            onPress={openModal2}
          />,
        ]}
      />
      <Modal ref={modalRef} title="" />
      <Modal ref={modalRef2} title="" />
    </>
  );
};
