import {
  Alert,
  AlertIcon,
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
};

const Settings = ({ sound, setSound }: SettingsProps) => {
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
            <Alert status="warning" my="5">
              <AlertIcon />
              <div>
                <p>
                  This feature is under active development, please be patient.
                  You will see it soon.
                </p>
                <p>Options to choose from.</p>
                <ol style={{ marginLeft: '2em' }}>
                  <li>Choose paragraph / custom text.</li>
                  <li>Set duration.</li>
                </ol>
              </div>
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
