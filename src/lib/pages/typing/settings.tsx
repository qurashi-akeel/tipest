import {
  Alert,
  AlertIcon,
  Box,
  Button,
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
};

const Settings = ({
  sound,
  setSound,
  setParagraphText,
  paragraphText,
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
            <Alert status="warning" my="5">
              <AlertIcon />
              <Box mx="4">
                <p>More options coming soon.</p>
                <ol style={{ marginLeft: '2em' }}>
                  <li>Custom text.</li>
                  <li>Set duration.</li>
                </ol>
              </Box>
            </Alert>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              disabled
              cursor="not-allowed"
              onClick={onClose} // TODO: implement this
            >
              Save Settings
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default Settings;
