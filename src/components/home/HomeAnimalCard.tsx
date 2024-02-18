import { ArrowDown } from 'iconsax-react-native';
import { Box, HStack, Image, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import CapFirstLetter from '../../utils/CapFirstLetter';
import * as FileSystem from 'expo-file-system'

type HomeAnimalCardProps = {
  common_name: string
  kingdom: string
  class_animal: string
  species: string
  image: URL
  populationDecreasing: boolean
  location: string
  status: string
}

const HomeAnimalCard = ({
  common_name,
  kingdom,
  class_animal,
  species,
  image,
  populationDecreasing,
  location,
  status
}: HomeAnimalCardProps) => {
  let localMarginX: number = 4;

  return (
    <VStack
      borderWidth={1}
      borderRadius={16}
      borderColor="#C1C1C1"
      mb={4}
    >
      <AnimalImage species={species} uri_str={image.toString()} />

      <HStack mx={localMarginX} mt={2}>
        <Text fontSize={13} flex={1}>
          {kingdom.toUpperCase()} - {class_animal.toUpperCase()}
        </Text>
        <Text fontSize={13}>
          {location.toUpperCase()}
        </Text>
      </HStack>

      <Text bold mx={localMarginX} fontSize={16}>
        {common_name}
      </Text>
      <Text mx={localMarginX} fontSize={12}>
        {species}
      </Text>

      <HStack mx={localMarginX} mb={3.5} mt={1} alignItems="center">
        <Box mr={1}>
          <ArrowDown color="#DC2626" size={20} variant="Bulk" />
        </Box>
        <Text flex={1}>
          {populationDecreasing ? "Decreasing" : "Recovering"}
        </Text>
        <Text>
          {CapFirstLetter(status)}
        </Text>
      </HStack>
    </VStack>
  )
}

export default HomeAnimalCard;

type AnimalImageProps = {
  species: string;
  uri_str: string;
}

const AnimalImage = ({
  species,
  uri_str
}: AnimalImageProps) => {
  
  return <Image
    w={342}
    h={156}
    borderTopRadius={16}
    source={{ uri: uri_str }}
    key={uri_str}
    alt={species + "_img"}
  />
}