import { Button, Flex, Menu, Text, TextLink } from '@contentful/f36-components';
import { ChevronDownIcon, CloseIcon } from '@contentful/f36-icons';
import { useCMA } from '@contentful/react-apps-toolkit';
import React, { useEffect, useMemo, useState } from 'react';

// AAA - next ones are coming straight from redux !!!
// import { useAppDispatch, useAppSelector } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  circuitPlanSelected,
  circuitPlansSelectors,
  fetchCircuitPlans,
} from '../store/circuitPlansSlice';
import { getCircuitPlan } from '../utils/getCircuitPlan';
import CircuitPlanWithStatusDot from './CircuitPlanWithStatusDot';
import MatchedText from './MatchedText';
import SearchInput from './SearchInput';
import TextLoader from './TextLoader';

const SelectCircuitPlan = () => {
  const circuitPlans = useSelector(circuitPlansSelectors.selectAll);
  const { selectedId, loading } = useSelector((state) => state.circuitPlans);
  const currentCircuitPlan = useSelector((state) =>
    circuitPlansSelectors.selectById(state, selectedId || '')
  );
  const dispatch = useDispatch();
  const cma = useCMA();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const menuItems = useMemo(() => {
    const orderedCircuitPlans = circuitPlans // circuitPlans ordered by circuitId
      .map(getCircuitPlan)
      .sort((a, b) =>
        !a.fields.circuitId
          ? 1 // a sorted after b --> return 1
          : !b.fields.circuitId
          ? -1 // b sorted after a --> return -1
          : a.fields.circuitId.localeCompare(b.fields.circuitId)
      );
    const itemsMap = orderedCircuitPlans // {circuitId: {name:circuitId,subItems:[contentfulObjects]}}
      .reduce((acc, circuitPlan) => {
        const cid = circuitPlan.fields.circuitId;
        if (!acc[cid]) {
          acc[cid] = {
            name: circuitPlan.fields.circuitId,
            subItems: [circuitPlan],
          };
        } else {
          acc[cid].subItems.push(circuitPlan);
        }
        return acc;
      }, {});
    const result = Object.values(itemsMap)
    .filter((item) => item.name.toLowerCase()
      .match(search.toLowerCase()));
      //debugger;
    return result;
  }, [circuitPlans, search]);

  useEffect(() => {
    dispatch(fetchCircuitPlans(cma));
  }, [cma, dispatch]);

  const handleSelect = (circuitPlan) => {
    dispatch(circuitPlanSelected(circuitPlan?.sys.id));
    setOpen(false);
  };

  const handleResetCircuitPlain = () => {
    dispatch(circuitPlanSelected(undefined));
  };

  return loading
  ? <TextLoader message='Loading circuit / plans' />
  : <Flex gap='8px' alignItems='center'>
      <Menu isOpen={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <Menu.Trigger>
          <Button endIcon={<ChevronDownIcon />}>
            {currentCircuitPlan?.fields.name || 'Select a Circuit/Plan'}
          </Button>
        </Menu.Trigger>
        {currentCircuitPlan && (
          <TextLink variant='secondary' icon={<CloseIcon />} onClick={handleResetCircuitPlain}>
            Clear
          </TextLink>
        )}
        <Menu.List>
          <Menu.ListHeader style={{ paddingLeft: 8, paddingRight: 8, border: 'none' }}>
            <SearchInput
              placeholder='Search Circuit/Plan'
              value={search}
              onSearch={(term) => setSearch(term)}
            />
          </Menu.ListHeader>
          {menuItems.map((item, index) => (
            <Menu.Submenu key={index}>
              <Menu.SubmenuTrigger>
                {item.name ? (
                  <MatchedText text={item.name} search={search} />
                ) : (
                  <Text fontColor='gray400' as='i'>
                    empty
                  </Text>
                )}
              </Menu.SubmenuTrigger>
              <Menu.List>
                {item.subItems.map((circuitPlan) => (
                  <Menu.Item
                    key={`${circuitPlan.fields.name}`}
                    onClick={() => handleSelect(circuitPlan)}
                  >
                    <CircuitPlanWithStatusDot
                      circuitPlan={circuitPlan}
                      circuitPlans={circuitPlans}
                    />
                  </Menu.Item>
                ))}
              </Menu.List>
            </Menu.Submenu>
          ))}
          {!menuItems.length && (
            <Menu.ListFooter style={{ padding: '8px 16px 12px', border: 'none' }}>
              <Text fontColor='gray400'>No circuit found.</Text>
            </Menu.ListFooter>
          )}
        </Menu.List>
      </Menu>
    </Flex>;
};

export default SelectCircuitPlan;
