import { AddIcon } from '../../components/icons/chakra';
import {
  Box,
  Button,
  Menu,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Portal
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface ComponentInfoProps {
  items: Array<{
    label: string;
    onClick: () => void;
  }>;
}

export const ComponentInfo: React.FC<ComponentInfoProps> = ({ items }) => (
  <Menu.Root>
    {/* <MenuButton
      as={Button}
      leftIcon={<AddIcon />}
      size="sm"
      variant="link"
      mx="2">
      Components
    </MenuButton> */}

    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          {items.map(item => (
            <Menu.Item key={item.label} onSelect={item.onClick} value="item-0">
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);

export interface TabsProps {
  tabs: Array<{
    label: React.ReactNode;
    content: React.ReactNode;
  }>;
  selectedTab: number;
  componentsInfo?: ComponentInfoProps['items'];
}

const TabsTemplate: React.FC<TabsProps> = props => {
  const [selectedTab, setSelectedTab] = useState(props.selectedTab);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <Box position="relative">
      <Tabs.Root
        value={selectedTab}
        onValueChange={handleTabChange}
        pos="relative"
        size="sm"
      >
        <Tabs.List pos="sticky" top="0" zIndex="1">
          {props.tabs.map((tab, i) => (
            <Tab key={i}>{tab.label}</Tab>
          ))}
          <Spacer />
          <ComponentInfo items={props.componentsInfo || []} />
        </Tabs.List>

        <TabPanels>
          {props.tabs.map((tab, i) => (
            <TabPanel key={i} p="0">
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs.Root>
    </Box>
  );
};

export default TabsTemplate;
