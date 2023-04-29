import {
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import Modals from "./components/Modals";
import axios from "axios";
import { toast } from "react-hot-toast";

const App = () => {
  const YOUR_API_KEY = "sk-oxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  const [text, setText] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const generate = async () => {
    setLoading(true);
    const datas: any = {
      model: "text-davinci-003",
      prompt: `Generate keyword from this text. Make the first latter of each word uppercase and separate with commas. The text is here: ${text}`,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.8,
      presence_penalty: 0.0,
    };
    try {
      const { data } = await axios.post(
        "https://api.openai.com/v1/completions",
        datas,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${YOUR_API_KEY}`,
          },
        }
      );
      const keyword = data.choices[0]?.text?.trim();
      toast.success("Keyword generated😍");
      setText("");
      onOpen();
      return setKeyword(keyword);
    } catch (error: any) {
      if (!error?.response?.data || !error?.response)
        return toast.error("Something went wrong!😒");

      const mess = error?.response.data?.message;
      if (mess) return toast.error(mess);
      toast.error("Fail to generate keyword😪");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container w="400px" h="auto" mx="auto" p={4}>
      <Center>
        <Image w="16" src="icon.png" alt="logo" />
      </Center>
      <VStack spacing={0} my={2}>
        <Heading as="h1" fontSize="xl" fontWeight="bold">
          Keyword Macker AI
        </Heading>
        <Text
          fontSize="sm"
          color="gray.600"
          fontWeight="400"
          textAlign="center"
        >
          Past your text in the bellow section and it will generate{" "}
          <strong>Keyword</strong> for you. 🙂
        </Text>
      </VStack>
      <VStack my={4}>
        <Textarea
          onChange={(event: any) => setText(event.target.value)}
          w="full"
          value={text}
          h="auto"
          placeholder="Past your text here..."
        />
        <Button disabled={loading} colorScheme="twitter" onClick={generate}>
          {loading ? <Spinner /> : "Generate Keyworld"}
        </Button>
      </VStack>
      <HStack
        w="full"
        textAlign="center"
        fontWeight="semibold"
        mt={3}
        justify="center"
      >
        <Text>Created by </Text>
        <Text
          cursor="pointer"
          color="green"
          textDecor="underline"
          onClick={() =>
            window.open("https://www.showwcase.com/devlopersabbir")
          }
        >
          @devlopersabbir
        </Text>
      </HStack>
      <Modals data={keyword} isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default App;
