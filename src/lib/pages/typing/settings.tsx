import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaGears } from 'react-icons/fa6';

import { PARAGRAPHS } from '~/lib/constants';

const SOUNDS = [
  'silent',
  'ball1',
  'ball2',
  'fire1',
  'click1',
  'click2',
  'click3',
];

type SettingsProps = {
  sound: string;
  setSound: (sound: string) => void;
  setParagraphText: (paragraphText: string) => void;
  paragraphText: string;
  typingDuration: number;
  setTypingDuration: (typingDuration: number) => void;
};

const Settings = ({
  sound,
  setSound,
  setParagraphText,
  paragraphText,
  typingDuration,
  setTypingDuration,
}: SettingsProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Text cursor="pointer" my={1} onClick={onOpen}>
        <FaGears width={10} height={10} />
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Typing Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder="Select sound"
              value={sound}
              onChange={(e) => setSound(e.target.value)}
            >
              {SOUNDS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            <Select
              mt={5}
              placeholder="Select paragraph"
              value={paragraphText}
              onChange={(e) => setParagraphText(e.target.value)}
            >
              {PARAGRAPHS.map((s) => (
                <option key={s.id} value={s.content}>
                  {`${s.level}: ${s.content.substring(0, 35)}...` ||
                    'No content'}
                </option>
              ))}
            </Select>
            <Box mt={5} display="flex" alignItems="center">
              <Text mb={2} flex={2}>
                Typing duration (sec)
              </Text>
              <Input
                flex={2}
                placeholder="Set typing duration"
                value={typingDuration}
                onChange={(e) => {
                  if (+e.target.value < 10) {
                    return setTypingDuration(10);
                  }
                  return setTypingDuration(Number(e.target.value));
                }}
                type="number"
              />
            </Box>
            <Box mt={5} display="flex" alignItems="center">
              <Text>Enter custom text</Text>
              <Input
                mt={2}
                placeholder="Custom text"
                value={paragraphText}
                onChange={(e) => setParagraphText(e.target.value)}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Save and Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Settings;
