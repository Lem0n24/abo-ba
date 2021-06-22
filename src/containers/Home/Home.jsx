import React, { useEffect, useMemo, useState } from 'react';
import { Page } from 'react-onsenui';
import moment from 'moment';
import axios from 'axios';
import { notification } from 'antd';


import { Loader, Toolbar } from 'components';
import { lessonTime } from 'constant';
import { getRoute } from 'routes';

const weekDays = moment.weekdays();

const Home = ({ navigator, params }) => {
  const { id } = params;

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedDay, setSelectedDay] = useState(moment());
  const [loading, setLoading] = useState(true);

  const weekParams = useMemo(() => {
    const weekNumber = selectedDay.week();
    const weekIsOdd = weekNumber % 2 === 1;

    return { weekNumber, weekIsOdd }
  }, [selectedDay]);

  const onBack = () => {
    const page = getRoute('groupSelect');

    navigator.replacePage(page);
  };


  const getGroupInfo = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`https://awesome-node-project.herokuapp.com/groupInfo/${id}`);

      setSelectedGroup(data);
    } catch (error) {
      localStorage.removeItem('savedGroup');

      notification.error({ message: 'Не удалось получить расписание' })
      setTimeout(() => {
        onBack();
      }, 1000);
    }

    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      getGroupInfo();
    }, 1000);
  }, []);

  const renderLesson = (lesson) => {
    const isExist = !!lesson.odd

    if (!isExist) {
      return;
    }

    return (
      <div className="page-home__lessons_item">
        <div className="lesson-time">
          {lessonTime[lesson.num - 1].split(',')[0]}
          <br />
          {lessonTime[lesson.num - 1].split(',')[1]}
        </div>

        <div className="lesson-name">
          <div className="name">
            {
              weekParams.weekIsOdd
                ? lesson.odd[0]
                : lesson.even[0]
            }
          </div>
          <div className="audit">
            {
              weekParams.weekIsOdd
                ? lesson.odd[1]
                : lesson.even[1]
            }
          </div>
        </div>
      </div>
    );
  };

  return (
    <Page
      modifier="home"
      renderToolbar={() => (
        <Toolbar
          onBack={onBack}
          title={selectedGroup?.name ?? 'Группа'}
          weekIsOdd={weekParams.weekIsOdd}
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
        />
      )}
    >
      {
        loading || !selectedGroup ? (
          <div className="page-home__loader">
            <Loader />
          </div>
        ) : (
          <div className="page-home">
            <div className="page-home__title">
              {`${weekDays[selectedDay.day()]} / ${selectedDay.format('DD.MM')}`}
            </div>
            <div className="page-home__lessons">
              {
                selectedGroup.lessons[selectedDay.day() - 1]?.map((lesson) => (
                  renderLesson(lesson)
                ))
              }
            </div>
          </div>
        )
      }
    </Page>
  );
}

export default Home;
