import React from 'react'
import TopBar from '../../../components/home/TopBar';
import { TouchableOpacity } from 'react-native';
import { ArrowLeft2 } from 'iconsax-react-native';
import { Box } from 'native-base';


const NewsTab = () => {
  return (
    <Box flex={1}>
      <TopBar
        height={70}
        leftComponent={
          <TouchableOpacity>
            <ArrowLeft2 color='white' />
          </TouchableOpacity>
        }
      />
    </Box>
  )
}

export default NewsTab;