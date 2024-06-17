import { Button, Flex } from '@chakra-ui/react';
import { Contract, ethers } from 'ethers';
import { JsonRpcSigner } from 'ethers';
import { FC, useEffect, useState } from 'react';

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

  useEffect(() => {
    console.log(signer);
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
      <Button onClick={onClickMetamask}>지갑 연결하기</Button>
    </Flex>
  );
};

export default App;
