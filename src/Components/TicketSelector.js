import EventBox from './EventBox/EventBox';
import CreateEventBox from './CreateEventBox/CreateEventBox';
import { useState } from 'react';

function TicketSelector() {
  const [sell, setSell] = useState(true);

  return (
    <div className="App">
      <button onClick={function (event) {
        localStorage.clear();
        console.log('Local storage is clear.')
      }}>
        Clear Local Storage
      </button>
      <div>
        |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
      </div>
      <div>
        <button onClick={() => setSell(!sell)}>
          Change Mode
        </button>
      </div>
      <div>
        <h1>Welcome Bruh</h1>
        {
          sell ?
            <CreateEventBox /> :
            <EventBox />
        }
      </div>
    </div>

  );
  /*    
  const quest = {
      text: '',
      order: ''
  }

  const [questions, setQuestions] = useState([]);
  // standart propsların state'i olabilir

  useEffect(() => {
      fetch("https://api.jotform.com/form?apiKey=5b688b80714d1dd8d6a203bc533c26cb", {
          body: "questions[0][type]=control_head" +
              "&questions[0][text]=BFK Cooking Workshops" +
              "&questions[0][order]=1" +
              "&questions[0][name]=Header" +
              "&questions[0][subHeader]=Cooking and Pastry workshops for the week" +

              "&questions[1][type]=control_head" +
              "&questions[1][text]=Choose a Workshop" +
              "&questions[1][order]=2" +
              "&questions[1][name]=Header2" +
              "&questions[1][headerType]=Small" +

              "&questions[2][type]=control_head" +
              "&questions[2][text]=Enter Credentials" +
              "&questions[2][order]=3" +
              "&questions[2][name]=Header3" +
              "&questions[2][headerType]=Small" +

              "&questions[3][type]=control_textbox" +
              "&questions[3][text]=Name" +
              "&questions[3][order]=4" +
              "&questions[3][name]=TextBox1" +
              "&questions[3][validation]=None" +
              "&questions[3][required]=No" +
              "&questions[3][readonly]=No" +
              "&questions[3][size]=20" +
              "&questions[3][labelAlign]=Auto" +
              "&questions[3][hint]= " +

              "&questions[4][type]=control_textbox" +
              "&questions[4][text]=Email" +
              "&questions[4][order]=5" +
              "&questions[4][name]=TextBox2" +
              "&questions[4][validation]=Email" +
              "&questions[4][required]=No" +
              "&questions[4][readonly]=No" +
              "&questions[4][size]=20" +
              "&questions[4][labelAlign]=Auto" +
              "&questions[4][hint]= " +

              "&questions[5][type]=control_textbox" +
              "&questions[5][text]=Phone Number" +
              "&questions[5][order]=6" +
              "&questions[5][name]=TextBox3" +
              "&questions[5][validation]=Numeric" +
              "&questions[5][required]=No" +
              "&questions[5][readonly]=No" +
              "&questions[5][size]=20" +
              "&questions[5][maxsize]=11" +
              "&questions[5][labelAlign]=Auto" +
              "&questions[5][hint]= " +

              "&questions[6][type]=control_button" +
              "&questions[6][text]=Submit" +
              "&questions[6][order]=7" +
              "&questions[6][name]=SubmitBtn" +
              "&questions[6][buttonStyle]=simple_green_apple" +
              "&questions[6][buttonAlign]=Center" +

              "&properties[title]=New Form" +
              "&properties[height]=600" +
              "&properties[width]=600" +

              "&emails[0][type]=notification" +
              "&emails[0][name]=notification" +
              "&emails[0][from]=default" +
              "&emails[0][to]=noreply@jotform.com" +
              "&emails[0][subject]=New Submission" +
              "&emails[0][html]=false",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
      });
  });
  */
}

export default TicketSelector;