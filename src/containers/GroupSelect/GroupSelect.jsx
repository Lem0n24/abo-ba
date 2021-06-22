import React, { useEffect, useState } from 'react';
import { Page, Button } from 'react-onsenui';
import { Select } from 'antd';

import logowthname from 'image/logowthname.png';

import { Toolbar, Loader } from 'components';
import { groupsJson } from 'constant';
import { getRoute } from 'routes';

const { Option } = Select;

const GroupSelect = ({ navigator }) => {
  const [groups, setGroups] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const onBack = () => {
    navigator.popPage();
  };

  useEffect(() => {
    setGroups(groupsJson);
  }, []);

  const onHome = () => {
    const page = getRoute('home', { id: selectedGroupId });

    navigator.replacePage(page);
  };

  const onChangeHandler = (groupId) => {
    setSelectedGroupId(groupId);
  };

  return (
    <Page
      modifier="group-select"
      // renderToolbar={() => (
      //   <Toolbar onBack={onBack} />
      // )}
      renderFixed={() => (
        <div className="page-group-select__upload-container">
          <div className="page-group-select__upload-container_btn">
            <Button modifier="button-main-node">
              Загрузить расписание
            </Button>
          </div>
        </div>
      )}
    >
      
      <div className="page-group-select">
        <img src={logowthname} className="page-group-select__logo" />
        {
          !groups ? (
            <div className="page-group-select__loader">
              <Loader />
            </div>
          ) : (
            <div className="page-group-select__content">
              <div className="page-group-select__title">
                Выберите группу
              </div>

              <div className="page-group-select__select-container">
                <Select
                  showSearch
                  onSearch={(event) => console.log(event)}
                  placeholder="Выбрать группу"
                  className="page-group-select__select-container_select"
                  onChange={onChangeHandler}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {
                    groups.map((group) => (
                      <Option value={group.id}>
                        {group.name}
                      </Option>
                    ))
                  }
                </Select>
              </div>

              <div className="page-group-select__btn-show">
                <Button
                  modifier="button-main-node"
                  onClick={onHome}
                  disabled={!selectedGroupId}
                >
                  Показать расписание
                </Button>
              </div>
            </div>
          )
        }
      </div>
    </Page>
  )
};

export default GroupSelect;
