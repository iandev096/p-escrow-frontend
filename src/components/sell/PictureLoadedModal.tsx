import React from 'react';
import { Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, Text, ModalFooter, Button } from '@chakra-ui/core';

interface PictureLoadedModalProps {
  show: boolean;
  onClose: Function,
  onContinue: Function
}

const PictureLoadedModal: React.FC<PictureLoadedModalProps> = ({ show, onClose, onContinue }) => {

  return (
    <Modal isOpen={show} onClose={() => { }} isCentered>
      <ModalOverlay onClick={() => { }} />
      <ModalContent>
        <ModalHeader>Image Uploaded</ModalHeader>
        <ModalBody>
          <Text>Do you want to add more?</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => onClose()}>Add more</Button>
          <Button onClick={() => onContinue()} variant='outline'>Continue</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PictureLoadedModal;
