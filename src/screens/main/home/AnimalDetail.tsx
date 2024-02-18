import { ArrowLeft2 } from 'iconsax-react-native';
import { Center } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import TopBar from '../../../components/home/TopBar';

const AnimalDetail = () => {
  return (
    <Center>
      <TopBar
        height={70}
        leftComponent={
          <TouchableOpacity>
            <ArrowLeft2 color='white' />
          </TouchableOpacity>
        }
      />
    </Center>
  )
}

export default AnimalDetail;