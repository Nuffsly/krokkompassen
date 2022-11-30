import { Component, Input, OnInit } from '@angular/core';
import questionData from '../../assets/json/questions.json'

@Component({
  selector: 'app-question-blocks',
  templateUrl: './question-blocks.component.html',
  styleUrls: ['./question-blocks.component.scss']
})

export class QuestionBlocksComponent implements OnInit {
  @Input() isPhonePortrait: boolean = false;

  questions!: Question[];
  qText: string = "";
  answers: Answer[] = new Array<Answer>();
  history: number[] = new Array<number>();

  ngOnInit(): void {
    // Initialize questions
    this.questions = deserializeQuestions(questionData);
    this.displayQuestion(1);
    console.log(this.isPhonePortrait)
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

