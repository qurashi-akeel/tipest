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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaGears } from 'react-icons/fa6';

const Settings = () => {
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
            <Button variant="solid" disabled cursor="not-allowed">
              Save Settings
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default Settings;
