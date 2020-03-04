import React, { Component } from "react";
import { getquestion,score } from "../functions/QuestionAnswer";

class QuestionAnswer extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      options: "",
      errors: {},
      answered:[],
      score:0,
      bool:[]
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    getquestion().then(res => {
      console.log(res.data);
        console.log(this.props.location.state.email);
      this.setState({ questions: res.data });
      // res.data.map(function(ques,i){
      //     // console.log("sd",ques.question);
      //     // this.state.questions = ques.questions;
      //     // this.setstate({questions:ques.question},()=>{
      //     //     console.log("QUES",this.state.questions);
      //     // });
      //     // this.setstate({options:ques.options})

      // })
    });
  }
  handleChange = (e,i) => {
   
      if(this.state.questions[i].answer==e.target.value && this.state.bool[i]!="true"){
        //   var score1 = this.state.score+1;
        //   score1 = score1 + 1;
        // console.log("LL",this.state.score+1);
         this.setState({score :this.state.score + 1},()=>{
            console.log("HEY",this.state.score)
         });
         let a = this.state.bool.slice(); //creates the clone of the state
         a[i] = "true";
         this.setState({bool: a},()=>{
            console.log(this.state.bool[i]);
         });
      
        // console.log(score1);
        // this.setstate({score:score1});
        //   this.state.score++;
        //   this.setState({score:score},()=>{
        //       console.log("hey",score);
        //   });
      
      }
      else{
        let a = this.state.bool.slice(); //creates the clone of the state
        a[i] = "false";
        this.setState({bool: a},()=>{
           console.log(this.state.bool[i]);
        });
          if(this.state.score>=1 && this.state.bool[i]=="true"){
            this.setState({score :this.state.score - 1},()=>{
                console.log("HI",this.state.score);
            });
             
          }

      }
    console.log("as",this.state.score);

   
  };

  onChange(e) {
    console.log("as", e.target.value);
  }
  onSubmit(e) {
    e.preventDefault();
    alert("Your score is :"+this.state.score);
    const newScore = {
        email: this.props.location.state.email,
        score:this.state.score
      }
  
      score(newScore).then(res => {
        this.props.history.push(`/login`)
      })
  }

  render() {
    return (
      <div>
        <h2>Answer the Questions Below</h2>
        <div className="container">
          <form noValidate onSubmit={this.onSubmit}>
            {this.state.questions.map((ques, i) => {
              return (
                <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                <div class="card">
                  <div class="card-body">
                    <p>Question:{ques.question}</p>
                  </div>
                  <select className="option" onChange={(e) => this.handleChange(e, i)}>
                      <option selected disabled hidden></option>
                    {Object.keys(ques.options).map((opt, j) => {
                      return (
                        <option value={ques.options[opt]}>
                          {ques.options[opt]}
                        </option>
                      );
                    })}
                  </select>
                </div>
                </div>
                </div>
              );
            })}
            <br />
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
            <button type="submit" className="btn btn-lg btn-primary btn-block">
              Submit
            </button>
            </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default QuestionAnswer;
