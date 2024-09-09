import { useState, useEffect } from 'react'



const App = () => {

  const [teacherSchedule, setTeacherSchedule] = useState({});
  const [selectedSchedule, setSelectedSchedule] = useState("Student");
  const [schedule, setSchedule] = useState({});
  const [selectDay, setSelectDay] = useState("Monday");
  const [lessons, setLesson] = useState([]);

  const title = "Schedule for " + selectDay
  const creator = "Fantomey"
  const git = "https://github.com/Fantomey"
  useEffect(() => {
    fetch('https://fantomey.github.io/ScheduleJSON/Schedule.json')
      .then(response => response.json())
      .then(data => {
        setSchedule(data.schedule);
        setLesson(data.schedule["Monday"]?.lessons || []);
      })
  }, [])

  useEffect(() => {
    fetch('https://fantomey.github.io/ScheduleJSON/Schedule2.json')
      .then(response => response.json())
      .then(data =>
        setTeacherSchedule(data.schedule)
      )
  }, [])
  const handleDayChange = (event) => {
    const day = event.target.value
    setSelectDay(day);
    if (selectedSchedule === "Student") {
      setLesson(schedule[day]?.lessons || []);
    } else {
      setLesson(teacherSchedule[day] || []);
    }
  };


  const handleScheduleChange = (event) => {
    const scheduleType = event.target.value;
    setSelectedSchedule(scheduleType);

    if (scheduleType === "Student") {
      setLesson(schedule[selectDay]?.lessons || []);
    } else {
      setLesson(teacherSchedule[selectDay] || []);
    }
  };

  return (
    <div className="container">
      <div className="content-title">
        <h1 className="title">{title}</h1>
      </div>
      <div className="content">
        <select id="scheduleSelect" value={selectedSchedule} onChange={handleScheduleChange}>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>
        <select id="daySelect" value={selectDay} onChange={handleDayChange}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
      </div>
      <ul className='lessons'>
        {lessons.length > 0 ? (
          lessons.map((lesson, index) => (
            <li className='lesson' key={index}> {index + 1 + "." + ""} {lesson} { }</li>
          ))
        ) : (
          <li className='no-lessons'>No lessons found for {selectDay}</li>
        )}
      </ul>
      <p className='smile'>(˶ᵔ ᵕ ᵔ˶)</p>
      <footer className="footer">
        <p className='creator'>Created by <a className='creator-special' target='_blank' href={git}>{creator}</a></p>
      </footer>
    </div>


  );
}

export default App;
