import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import questionData from '../../assets/json/questions.json';
import { RulesComponent } from './rules/rules.component';

@Component({
  selector: 'app-question-blocks',
  templateUrl: './question-blocks.component.html',
  styleUrls: ['./question-blocks.component.scss'],
})
export class QuestionBlocksComponent implements OnInit {
  @Input() isPhonePortrait: boolean = false;

  private blockBack: boolean = false;
  questions!: Question[];
  qText: string = '';
  answers: Answer[] = new Array<Answer>();
  history: number[] = new Array<number>();
  isEndNode: boolean = false;
  backAvailable = ():boolean => {return (this.history.length > 1) && !this.blockBack;};
  hasRules = ():boolean => { return this.answers.length > 0 };

  ENDNODECUTOFF = 1000;

  @ViewChild('rulesHost', {read: ViewContainerRef}) rulesHost!: ViewContainerRef

  ngOnInit(): void {
    // Initialize questions
    this.questions = deserializeQuestions(questionData);
    this.goToQuestion(1);
  }

  displayQuestion(id: number): void {
    let question: Question | undefined = this.questions.find((e) => {
      return e.id === id;
    });
    if (question !== undefined) {
      this.isEndNode = false;
      this.qText = question.questionBody;
      this.answers = question.answers;
    }
  }

  displayEndNode(id: number): void {
    let endNode: Question | undefined = this.questions.find((e) => {
      return e.id === id;
    });
    if (endNode !== undefined) {
      this.isEndNode = true;
      this.qText = endNode.questionBody;
      this.answers = endNode.answers
    }
  }

  displayRules(): void {
    if (this.rulesHost.length > 0) { return; }
    const rules = this.rulesHost.createComponent<RulesComponent>(RulesComponent);
    rules.instance._title = this.answers[0].answerBody;
    rules.instance._body = this.answers[1].answerBody;
    rules.instance._ViewContainerRef = this.rulesHost;
    rules.instance._isPhonePortrait = this.isPhonePortrait;
    rules.instance.closeWindow.subscribe(this.closeRules);
    this.blockBack = true;
  }

  closeRules(containerRef: ViewContainerRef): void {
    containerRef.clear();
    this.blockBack = false;
  }

  goToQuestion(id: number): void {
    this.history.push(id);
    if (id > this.ENDNODECUTOFF) { this.displayEndNode(id); }
    else { this.displayQuestion(id); }
  }

  stepBack(): void {
    if (this.history.length > 1) {
      this.history.pop();
      let id = this.history[this.history.length - 1];
      if (id !== undefined) {
        this.displayQuestion(id);
      }
    }
  }

  restart(): void {
    this.history = [];
    this.goToQuestion(1);
  }
}

class Question {
  id: number;
  questionBody: string;
  answers: Answer[];

  constructor(id: number, question: string, answers: Answer[]) {
    this.id = id;
    this.questionBody = question;
    this.answers = answers;
  }
}

class Answer {
  answerBody: string;
  leadsTo: number;

  constructor(answer: string, leadsTo: number) {
    this.answerBody = answer;
    this.leadsTo = leadsTo;
  }
}

function deserializeQuestions(
  questionData: {
    id: number;
    questionBody: string;
    answers: { answerBody: string; leadsTo: number }[];
  }[]
): Question[] {
  let result: Question[] = Array<Question>();

  questionData.forEach((element) => {
    result.push(
      new Question(
        element.id,
        element.questionBody,
        deSerializeAnswers(element.answers)
      )
    );
  });

  return result;
}
function deSerializeAnswers(
  answers: { answerBody: string; leadsTo: number }[]
): Answer[] {
  let result: Answer[] = Array<Answer>();

  answers.forEach((element) => {
    result.push(new Answer(element.answerBody, element.leadsTo));
  });

  return result;
}
