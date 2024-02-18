import React from 'react'
import GameSelect from './GameSelect';
import { Box } from 'native-base';


const GamesTab = () => {
  return (
    <Box flex={1}>
      <GameSelect />
    </Box>
  )
}

export default GamesTab;