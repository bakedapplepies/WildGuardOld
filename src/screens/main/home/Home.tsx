import { Center, FlatList, HStack, Text } from 'native-base';
import React from 'react';
import SearchBar from '../../../components/SearchBar';
import TopBar from '../../../components/home/TopBar';
import { TouchableOpacity } from 'react-native';
import { ArrowRight } from 'iconsax-react-native';
import { Animal } from '../../../db/animal.dao'
import HomeAnimalCard from '../../../components/home/HomeAnimalCard';
import * as FileSystem from 'expo-file-system'


const Home = () => {
  return (
    <Center>
      <TopBar
        title="WildGuard"
        height={100}
      />
      <SearchBar />
      <ListHeader /*local*/ />
      <AnimalDiscoveryList /*local*/ />

    </Center>
  )
}

export default Home;

// Amazing species & See more ->
const ListHeader = () => (
  <HStack mx={5} mt={6} alignItems="center">
    <Text flex={1} fontSize={15}>Amazing species</Text>
    <TouchableOpacity>
      <HStack alignItems="center" space={1}>
        <Text fontSize={10}>
          See more
        </Text>
        <ArrowRight color="black" size={12} />
      </HStack>
    </TouchableOpacity>
  </HStack>
)

const AnimalDiscoveryList = () => {
  // TODO: Actually retrieve animals
  // retrieve animals
  let animalData: Animal[] = [
    {
      common_name: "Wandering Albatross",
      kingdom: "Animalia",
      class_animal: "Aves",
      species: "Diomedea exulans",
      image: new URL("https://cdn.download.ams.birds.cornell.edu/api/v1/asset/609860353/1800"),
      description: "",
      populationDecreasing: true,
      location: "global",
      status: "vulnerable"
    },
    {
      common_name: "Spinetail Devil Ray",
      kingdom: "Animalia",
      class_animal: "Chondrichthyes",
      species: "Mobula mobular",
      image: new URL("assets/animals/giant_devil_ray.jpg"),
      description: "",
      populationDecreasing: true,
      location: "global",
      status: "endangered"
    },
    {
      common_name: "Podocarpus nakaii",
      kingdom: "Plantae",
      class_animal: "Pinopsida",
      species: "Podocarpus nakaii",
      image: new URL("https://threatenedconifers.rbge.org.uk/images/uploads/_conifersMainImage/Podocarpus-nakai_eb9e388a9e_o.jpg"),
      description: "",
      populationDecreasing: true,
      location: "global",
      status: "endangered"
    },
    {
      common_name: "Web-footed Tenrec",
      kingdom: "Animalia",
      class_animal: "Mammalia",
      species: "Limnogale mergulus",
      image: new URL("https://pbs.twimg.com/media/EvAbvsEXAAU_lxs.jpg"),
      description: "",
      populationDecreasing: true,
      location: "global",
      status: "vulnerable"
    },
  ];

  console.log(FileSystem.bundleDirectory + "animals/giant_devil_ray.jpg");

  const renderAnimalCard = (item: Animal) => (
    <HomeAnimalCard
      common_name={item.common_name}
      kingdom={item.kingdom}
      class_animal={item.class_animal}
      species={item.species}
      image={item.image}
      populationDecreasing={item.populationDecreasing}
      location={item.location}
      status={item.status}
    />
  )

  return <FlatList
    data={animalData}
    renderItem={({ item }) => renderAnimalCard(item)}
    mt={5}
    mb={20}
  />
}