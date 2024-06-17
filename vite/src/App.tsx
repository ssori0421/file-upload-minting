import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { Contract, ethers } from 'ethers';
import { JsonRpcSigner } from 'ethers';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import mintNftAbi from '../src/mintNftAbi.json';

const App: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  const onClickMetamask = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);

      setSigner(await provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.currentTarget.files) return;

      const formData = new FormData();

      formData.append('file', e.currentTarget.files[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!signer) return;

    setContract(
      new Contract(
        '0x75B714A1e4f2a006E99E1782084F3dB34C946091',
        mintNftAbi,
        signer
      )
    );
  }, [signer]);

  return (
    <Flex
      bgColor='red.100'
      w='100%'
      minH='100vh'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      {signer ? (
        <>
          <Text>{signer.address}</Text>
          <Input type='file' onChange={onChangeFile} />
        </>
      ) : (
        <Button onClick={onClickMetamask}>지갑 연결하기</Button>
      )}
    </Flex>
  );
};

export default App;
