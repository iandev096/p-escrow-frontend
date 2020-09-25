import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Text, ModalFooter, Button } from '@chakra-ui/core';

interface PictureNotUploadedModalProps {
  show: boolean;
  onClose: Function,
  onContinue: Function
}

const PictureNotUploadedModal: React.FC<PictureNotUploadedModalProps> = ({ show, onClose, onContinue }) => {

  return (
    <Modal isOpen={show} onClose={() => { }} isCentered>
      <ModalOverlay onClick={() => { }} />
      <ModalContent>
        <ModalHeader>No image uploaded</ModalHeader>
        <ModalBody>
          <Text>Do you want to proceed without adding any image(s)?</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => onContinue()} >Yes</Button>
          <Button onClick={() => onClose()} variant='ghost'>No</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PictureNotUploadedModal;