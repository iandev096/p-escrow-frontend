import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/core';

interface LogoutDialogProps {
  isOpen: boolean;
  yesHandler: (event: React.MouseEvent<any, MouseEvent>) => void;
  noHandler: (event: React.MouseEvent<any, MouseEvent>) => void;
  onClose?: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, reason?: "pressedEscape" | "clickedOverlay") => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ isOpen, onClose, yesHandler, noHandler }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay onClick={noHandler} />
      <ModalContent>
        <ModalHeader>Logout Dialog</ModalHeader>
        <ModalCloseButton onClick={noHandler} />
        <ModalBody>
          <Text>Do you want to logout?</Text>
        </ModalBody>

        <ModalFooter>
          <Button variantColor="blue" mr={3} onClick={yesHandler}>
            Yes
          </Button>
          <Button variant="ghost" onClick={noHandler}>No</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutDialog;