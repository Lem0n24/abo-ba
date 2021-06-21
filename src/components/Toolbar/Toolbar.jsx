import React from 'react';
import { Toolbar as RootToolbar, Button } from 'react-onsenui';
import { DatePicker, ConfigProvider } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/locale/ru_RU';

const Toolbar = (props) => {
  const {
    onBack,
    title,
    weekIsOdd,
    selectedDay,
    setSelectedDay,
  } = props;

  const onChange = (date, dateString) => {
    setSelectedDay(moment(dateString))
  };

  return (
    <RootToolbar className="toolbar-container">
      <div className="toolbar-container__title">
        <Button onClick={onBack} modifier="button-main-node">
          <div>
            {title}
          </div>

          <div className="toolbar-container__title_week">
            {
              weekIsOdd
              ? 'Нечетная'
              : 'Четная'
            }
          </div>
        </Button>

        <div className="toolbar-container__calendar">
          <ConfigProvider locale={locale}>
            <DatePicker
              onChange={onChange}
              allowClear={false}
            />
          </ConfigProvider>
        </div>
      </div>
    </RootToolbar>
  );
};

export default Toolbar;
