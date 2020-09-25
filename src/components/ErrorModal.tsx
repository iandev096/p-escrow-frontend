import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/core';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: Function;
  errorMessage: string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, errorMessage }) => {

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader >Error</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{errorMessage}</Text>
        </ModalBody>

        <ModalFooter>
          <Button variantColor="blue" mr={3} onClick={() => onClose()}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
