import { SearchNormal1, Setting4 } from "iconsax-react-native";
import { Divider, HStack, Input } from "native-base";
import { TouchableOpacity } from "react-native";

const SearchBar = () => {
  return (
    <HStack mx={5}>
      <Input
        shadow={1}
        cursorColor="#08B364"
        placeholder="Search animals"
        placeholderTextColor="#A3A3A3"
        fontSize={16}
        flex={1}
        borderRadius={100}
        borderWidth={0}
        mt={-5}
        backgroundColor="white"
        leftElement={
          <HStack ml={3}>
            <SearchNormal1 color="#A3A3A3" />
          </HStack>
        }
        rightElement={
          <HStack mr={3} space={1.5}>
            <Divider bg="#E5E5E5" orientation="vertical" thickness={1} height={6} />
            <TouchableOpacity>
              <Setting4 color="#A3A3A3" />
            </TouchableOpacity>
          </HStack>
        }
      />
    </HStack>
  )
}

export default SearchBar;