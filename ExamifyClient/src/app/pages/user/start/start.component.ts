import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from 'src/app/services/answer.service';
import { LoginService } from 'src/app/services/login.service';
import { QuizQuestionsService } from 'src/app/services/quiz-questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  resultData: any;
  qId: any;
  questions: any;
  quizTitle: any


  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  resultShow = false;
  timer: any;
  totalMarks = 0;
  totalQuestions = 0;

  // saveAnswer={
  //   content:'',
  //   submittedAt:'',
  //   marksObtain:0,
  //   totalMarks:0,
  //   questionAttempted:0,
  //   numberOfCorrectAnswer:0,
  //   quizId:0,
  //   userId:0
  // }
  saveAnswer:any;
  user:any;
  
  constructor(private _route: ActivatedRoute, private _queston: QuizQuestionsService, private _quiz: QuizService, private _navigateRoute: Router,private _login:LoginService,private _answer:AnswerService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._route.snapshot.params['qId'];
    this.loadQuestion();
    this.user= this._login.getUser();
    // window.addEventListener('beforeunload', (event) => {
      
    //   event.preventDefault();
    //   event.returnValue = ''; 
    // });
  }

  loadQuestion() {
    this._queston.getQuestionsOfQuizForTest(this.qId).subscribe((data) => {
      this.questions = data;
      this.timer = this.questions.length * 2 * 60;
      console.log(data);
      this.questions.forEach((q: any) => {
        q['givenAnswer'] = '';
      })

      //starting time
      this.startTime();
    }, (error) => {
      console.log(error);
      Swal.fire('Error', 'Error while Loading question of quiz', 'error');
    })
  }

  preventBackButton() {
    history.pushState(null, '', location.href);

    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };
  }

  submitQuiz() {
    Swal.fire({
      title: 'Sure to Submit ?',
      showDenyButton: false,
      showCancelButton: true,
      showConfirmButton: true,
      denyButtonText: 'Exit !',
      icon: 'info'
    }).then((result) => {

      if (result.isConfirmed) {

        this.evaluateQuizFromServer();

      } else {
        Swal.fire("Denied !");
      }
    })
  }

  startTime() {
    let time = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluateQuizFromServer();
        clearInterval(time);
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime() {
    let hours = Math.floor(this.timer / 3600);
    let minutes = Math.floor((this.timer % 3600) / 60);
    let seconds = this.timer % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  evaluateQuiz() {
    
    console.log(this.questions);
    this.questions.forEach((q: any) => {
      if (q.answer == q.givenAnswer) {
        console.log(q.answer + " " + this.questions[0].quiz.maxMarks);
        this.correctAnswers++;
        let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += marksSingle;
      }

      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }

    })
    // console.log("c" + this.correctAnswers);
    // console.log("g" + this.marksGot + " " + this.attempted);

    this.resultData = {
      marksObtained: this.marksGot,
      totalAttempted: this.attempted,
      correctAns: this.correctAnswers,
      quizTitle: this.questions[0].quiz.title,
      totalQuestions: this.questions.length,
      totalMarks: this.questions[0].quiz.maxMarks
    }

    this._navigateRoute.navigate(['show-result'], { queryParams: this.resultData });

  }

  evaluateQuizFromServer() {

    this._queston.evaluateQuiz(this.questions).subscribe((data:any)=>{
      // console.log(data);
      this.resultData = {
        marksObtained: Number(data.marksGot).toFixed(2),
        totalAttempted:data.attempted,
        correctAns: data.correctAnswer,
        quizTitle: this.questions[0].quiz.title,
        totalQuestions: this.questions.length,
        totalMarks: this.questions[0].quiz.maxMarks
      }
     
      //storing quiz attempted details with questiona and answer to database
      //saving question content for database
      this.saveAnswer = {
        content: JSON.stringify(this.questions),
        submittedAt: '',
        marksObtain: data.marksGot,
        totalMarks: this.questions[0].quiz.maxMarks,
        questionAttempted: data.attempted,
        numberOfCorrectAnswer: data.correctAnswer,
        quizId: Number(this.qId),
        userId: this.user.id,
      };
    // console.log(this.saveAnswer);
      this._answer.addAnswer(this.saveAnswer).subscribe((data)=>{
        console.log(data);
      },(error)=>{
        console.log(error);
      })
  
      this._navigateRoute.navigate(['show-result'], { queryParams: this.resultData });
      
    },(error)=>{
      console.log(error);
      Swal.fire("Error while Evaluating ! Server Error !")
    })

  }


}
