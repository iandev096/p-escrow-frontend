import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Spinner } from '@chakra-ui/core';

interface ScreenLoaderProps {
  show: boolean;
  label?: string;
}

const ScreenLoader: React.FC<ScreenLoaderProps> = ({ show, label }) => {

  return (
    <Modal isOpen={show} onClose={() => { }} isCentered>
      <ModalOverlay onClick={() => { }} />
      <ModalContent>
        <ModalHeader>{label ?? 'Loading'}</ModalHeader>
        <ModalBody>
          <Spinner color='blue.400' />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ScreenLoader