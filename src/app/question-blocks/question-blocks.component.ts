import { Component, OnInit } from '@angular/core';
import questionData from '../../assets/json/questions.json'
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'

@Component({
  selector: 'app-question-blocks',
  templateUrl: './question-blocks.component.html',
  styleUrls: ['./question-blocks.component.scss']
})

export class QuestionBlocksComponent implements OnInit {
  questions!: Question[];
  qText: string = "";
  answers: Answer[] = new Array<Answer>();

  isPhonePortrait: boolean = false;

  constructor(private bpObserver:BreakpointObserver){}

  ngOnInit(): void {
    // Subscribe to neccesary breakpoint observer events
    this.bpObserver.observe(Breakpoints.HandsetPortrait)
      .subscribe(result => {
        this.isPhonePortrait = false;

        if(result.matches) {
          this.isPhonePortrait = true;
        }
      })

    // Initialize questions
    this.questions = deserializeQuestions(questionData);
    this.displayQuestion(1);
  }

  displayQuestion(id: number) {
    let question: Question | undefined = this.questions.find((e) => {return e.id === id});
    if (question !== undefined){
      this.qText = question.questionBody;
      this.answers = question.answers;
    }
  }
}

class Question{
  id: number;
  questionBody: string;
  answers: Answer[];

  constructor(id: number, question: string, answers: Answer[]){
    this.id = id;
    this.questionBody = question;
    this.answers = answers;
  }
}

class Answer{
  answerBody: string;
  leadsTo: number;

  constructor(answer: string, leadsTo: number){
    this.answerBody = answer;
    this.leadsTo = leadsTo;
  }
}

function deserializeQuestions(questionData: { id: number; questionBody: string; answers: { answerBody: string; leadsTo: number; }[]; }[]): Question[] {
  let result: Question[] = Array<Question>();

  questionData.forEach(element => {
    result.push(new Question(element.id, element.questionBody, deSerializeAnswers(element.answers)));
  });

  return result;
}
function deSerializeAnswers(answers: { answerBody: string; leadsTo: number; }[]): Answer[] {
  let result: Answer[] = Array<Answer>();

  answers.forEach(element => {
    result.push(new Answer(element.answerBody, element.leadsTo));
  });

  return result;
}

