import { Center, HStack, Text } from "native-base";

type TopBarProps = {
  height: number,
  title?: string
  leftComponent?: React.ReactNode
  rightComponent?: React.ReactNode
}

// padding top cuz status bar

const TopBar = ({
  height,
  title,
  leftComponent,
  rightComponent
}: TopBarProps) => {
  return (

    <HStack bg="#08B364" h={height} pt={4}>
      { /* Left Cnter */}
      <HStack mx={4} mt={5}>
        {leftComponent ? leftComponent : <></>}
      </HStack>

      { /* Middle Cnter */}
      <Center flex={1}>
        <Text color="white" fontSize={16}>
          {title ? title : ""}
        </Text>
      </Center>

      { /* Right Cnter */}
      <HStack mx={4} mt={5}>
        {rightComponent ? rightComponent : <></>}
      </HStack>
    </HStack>
  )
}

export default TopBar;