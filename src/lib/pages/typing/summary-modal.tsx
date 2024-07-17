import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';

import { formatSecondsToMinutes } from '~/lib/utils';

type SummaryModalProps = {
  typingSummary: {
    duration: number;
    totalWords: number;
    correctWords: number;
    typingSpeed: number;
    accuracy: number;
  };
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const SummaryModal = ({
  typingSummary,
  isModalOpen,
  setIsModalOpen,
}: SummaryModalProps) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      isCentered
    >
      <ModalOverlay />
      <ModalContent py="3">
        <ModalHeader>Typing Test Summary</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={2}>
            <HStack justify="space-between">
              <Text>Typing Duration:</Text>
              <Text fontWeight="bold">
                {formatSecondsToMinutes(typingSummary.duration)}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Total Words:</Text>
              <Text fontWeight="bold">{typingSummary.totalWords}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Correct Words:</Text>
              <Text fontWeight="bold">{typingSummary.correctWords}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Typing Speed:</Text>
              <Text fontWeight="bold">
                {typingSummary.typingSpeed} words per minute
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Accuracy:</Text>
              <Text fontWeight="bold">
                {typingSummary.accuracy.toFixed(2)}%
              </Text>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SummaryModal;
