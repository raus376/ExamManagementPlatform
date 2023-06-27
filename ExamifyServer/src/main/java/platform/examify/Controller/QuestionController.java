package platform.examify.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import platform.examify.Exception.QuestionException;
import platform.examify.Service.QuestionService;
import platform.examify.Service.QuizService;
import platform.examify.model.Question;
import platform.examify.model.Quiz;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@Autowired
	private QuizService quizService;

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/create")
	public ResponseEntity<Question> addQuestion(@RequestBody Question question) throws QuestionException {

		if (question == null) {
			throw new QuestionException("Question Details Required");
		}

		try {
			Question addQuestion = questionService.addQuestion(question);

			return new ResponseEntity<>(addQuestion, HttpStatus.CREATED);
		} catch (Exception e) {
			throw new QuestionException(e.getMessage());
		}
	}

	@GetMapping("/get/{questionId}")
	public ResponseEntity<Question> getQuestion(@PathVariable("questionId") Long questionId) throws QuestionException {

		if (questionId == null) {
			throw new QuestionException("Question Id Required !");
		}

		try {
			Question question = questionService.getQuestion(questionId);

			return new ResponseEntity<>(question, HttpStatus.OK);
		} catch (Exception e) {
			throw new QuestionException(e.getMessage());
		}

	}

	@GetMapping("/quiz/{quizId}")
	public ResponseEntity<?> getAllQuestionByQuizId(@PathVariable("quizId") Integer quizId) throws QuestionException {

		try {

			Quiz quiz = quizService.getQuiz(quizId);

			Set<Question> questions = quiz.getQuestions();

			List list = new ArrayList(questions);

			if (list.size() > quiz.getNumberOfQuestions()) {
				list = list.subList(0, quiz.getNumberOfQuestions() + 1);
			}
			Collections.shuffle(list);

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			throw new QuestionException(e.getMessage());
		}
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/update")
	public ResponseEntity<Question> updateQuestion(@RequestBody Question question) throws QuestionException {

		try {
			Question updatedQuestion = questionService.updateQuestion(question);

			return new ResponseEntity<>(updatedQuestion, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			throw new QuestionException(e.getMessage());
		}
	}

	@DeleteMapping("/delete/{questionId}")
	public ResponseEntity<Question> deleteQuestion(@PathVariable("questionId") Long questionId) throws QuestionException{

		try {
			Question question = questionService.deleteQuestion(questionId);

			return new ResponseEntity<>(question, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			throw new QuestionException(e.getMessage());
		}
	}

}