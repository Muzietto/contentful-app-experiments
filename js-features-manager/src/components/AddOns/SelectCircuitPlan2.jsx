import { Button, Flex, Menu, Text, TextLink } from '@contentful/f36-components';
import { ChevronDownIcon, CloseIcon } from '@contentful/f36-icons';
import { useCMA } from '@contentful/react-apps-toolkit';
import React, { useEffect, useMemo, useState } from 'react';

// AAA - next ones are coming straight from redux !!!
import { useAppDispatch, useAppSelector } from '../../store';
import {
  circuitPlanSelected,
  circuitPlansSelectors,
  fetchCircuitPlans,
} from '../../store/circuitPlansSlice';
import { getCircuitPlan } from '../../utils/getCircuitPlan';
import CircuitPlanWithStatusDot2 from './CircuitPlanWithStatusDot2';
import MatchedText2 from './MatchedText2';
import SearchInput2 from './SearchInput2';
import TextLoader2 from './TextLoader2';

const SelectCircuitPlan2 = ({
  circuitPlans = {
    ids: [],
    entities: {},
    loading: false,
    selectedId: '',
  },
  fm2Dispatch,
}) => {
  // const circuitPlans = useAppSelector(circuitPlansSelectors.selectAll);
  // const { selectedId, loading } = useAppSelector((state) => {
    // return state.circuitPlans;
  // });
  const { loading } = circuitPlans;

/*
  const selectedCircuitPlanZ = useAppSelector((state) => // the chosen in the upper select
    circuitPlansSelectors.selectById(state, selectedId || '')
  );
*/

  // const dispatch = useAppDispatch();
  // const cma = useCMA();
  const [open, setOpen] = useState(false); // see Menu component
  const [circuitNameSearch, setCircuitNameSearch] = useState('');

  const selectedCircuitPlan = function() {

    const arrayOfChosens = Object.values(circuitPlans.entities)
      .filter(({ sys }) => {

        const outcome = sys.id === circuitPlans.selectedId;
        return outcome;
      });

    return arrayOfChosens[0];
  }();

  const menuItems = useMemo(() => {
    const orderedCircuitPlans = Object.values(circuitPlans.entities) // circuitPlans ordered by circuitId
      //.map(getCircuitPlan)
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
      .match(circuitNameSearch.toLowerCase()));
      //debugger;
    return result;
  }, [circuitPlans, circuitNameSearch]);

/*
  useEffect(() => {
    dispatch(fetchCircuitPlans(cma));
  }, [cma, dispatch]);
*/

  const handleSelect = circuitPlan => {
    fm2Dispatch({
      type: 'SELECT_CIRCUITPLAN',
      payload: circuitPlan?.sys.id,
    });
    // dispatch(circuitPlanSelected(circuitPlan?.sys.id));
    setOpen(false);
  };

  const handleResetCircuitPlain = () => {
    // dispatch(circuitPlanSelected(undefined));
    fm2Dispatch({
      type: 'UNSELECT_CIRCUITPLAN',
    });
  };

  return loading
  ? <TextLoader2 message='Loading circuit / plans' />
  : <Flex gap='8px' alignItems='center'>
      <Menu isOpen={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <Menu.Trigger>
          <Button endIcon={<ChevronDownIcon />}>
            {selectedCircuitPlan?.fields.name || 'Select a Circuit/Plan'}
          </Button>
        </Menu.Trigger>
        {selectedCircuitPlan && (
          <TextLink variant='secondary' icon={<CloseIcon />} onClick={handleResetCircuitPlain}>
            Clear
          </TextLink>
        )}
        <Menu.List>
          <Menu.ListHeader style={{ paddingLeft: 8, paddingRight: 8, border: 'none' }}>
            <SearchInput2
              placeholder='Search Circuit/Plan'
              value={circuitNameSearch}
              onSearch={(term) => setCircuitNameSearch(term)}
            />
          </Menu.ListHeader>
          {menuItems.map((item, index) => (
            <Menu.Submenu key={index}>
              <Menu.SubmenuTrigger>
                {item.name ? (
                  <MatchedText2 text={item.name} search={circuitNameSearch} />
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
                    <CircuitPlanWithStatusDot2
                      circuitPlan={circuitPlan}
                      circuitPlans={Object.values(circuitPlans.entities)}
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

export default SelectCircuitPlan2;
