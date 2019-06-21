import React, {Component} from 'react';
import './App.css';

const newQuiz = {
  name: "food quiz", 
  author: "brennan", 
  questions: [
    {
      questionName: "what like most",
      answers: [
        {
          text: "bannana"
        }, 
        {
          text: "apple"
        }, 
        {
          text: "orange"
        },
      ]
    }
  ]
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      quizzes: [],
    }
  }

  componentDidMount(){
    fetch('http://localhost:8080/get-all-quizzes')
  .then(response => {
    return response.json();
  })
  .then(myJson => {
    this.setState({
      quizzes: myJson
    }, () =>{
      console.log(this.state.quizzes);
    })
  });
  }

  handleAddQuiz = (e) => {
    e.preventDefault();
    console.log(e);
    fetch('http://localhost:8080/add-quiz', {
      headers: {
        'Accept': 'application/json', 
        'Content-type': 'application/json'
      },
      method: "POST", 
      body: JSON.stringify(newQuiz), 
    })
    .then(res => {
      if(res.status === 200){
      console.log("quiz added")
    } else{
      console.log("died")
    }
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  render(){
    return (
      <div className="App">
      <i class="far fa-plus-square"></i>
        {this.state.quizzes.map((quiz, index) => {
          return(
            <div key={index}>
              <p>Quiz name: {quiz.name}</p>
              <p>Author: {quiz.author}</p>
              {quiz.questions.map((question, index) => {
                return(
                  <div key={index}>
                    <p>Question {index + 1}: {question.questionName}</p>
                    {question.answers.map((answer, index) => {
                      return(
                        <p key={index}>
                          {answer.text}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
              </div>
          )
        })
        }
        <p> hello </p>
        <button onClick={e => this.handleAddQuiz(e)} > Add Quiz </button>
      </div>
    );
  }
}

export default App;
