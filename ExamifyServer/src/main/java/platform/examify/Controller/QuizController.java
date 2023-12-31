package platform.examify.Controller;

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

import platform.examify.Exception.QuizException;
import platform.examify.Service.QuizService;
import platform.examify.model.Question;
import platform.examify.model.Quiz;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

	@Autowired
	private QuizService quizService;

	@PreAuthorize("hasRole('ADMIN') or hasRole('ORGANIZATION')")
	@PostMapping("/create")
	public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz) throws QuizException {

		if (quiz == null) {
			throw new QuizException("Quiz Details Required");
		}

		try {
			Quiz addQuiz = quizService.addQuiz(quiz);

			return new ResponseEntity<>(addQuiz, HttpStatus.CREATED);
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('NORMAL') or hasRole('ORGANIZATION')")
	@GetMapping("/get/{quizId}")
	public ResponseEntity<Quiz> getQuiz(@PathVariable("quizId") Integer quizId) throws QuizException {

		if (quizId == null) {
			throw new QuizException("Quiz Id Required !");
		}

		try {
			Quiz quiz = quizService.getQuiz(quizId);

			return new ResponseEntity<>(quiz, HttpStatus.OK);
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}

	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('NORMAL') or hasRole('ORGANIZATION')")
	@GetMapping("/getAll")
	public ResponseEntity<Set<Quiz>> getAllQuiz() throws QuizException {

		try {
			Set<Quiz> quizzes = quizService.getQuizzes();
			return new ResponseEntity<>(quizzes, HttpStatus.OK);
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('ORGANIZATION')")
	@PutMapping("/update")
	public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz) throws QuizException {

		try {
			Quiz updatedQuiz = quizService.updateQuiz(quiz);

			return new ResponseEntity<>(updatedQuiz, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/{quizId}")
	public ResponseEntity<Quiz> deleteCategory(@PathVariable("quizId") Integer quizId) throws QuizException {

		if (quizId == null) {
			throw new QuizException("Quiz Id Required !");
		}

		try {
			Quiz quiz = quizService.deleteQuiz(quizId);

			return new ResponseEntity<>(quiz, HttpStatus.OK);
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}

	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('NORMAL') or hasRole('ORGANIZATION')")
	@GetMapping("/getActive")
	public ResponseEntity<Set<Quiz>> getActiveQuizzes() throws QuizException {

		try {
			Set<Quiz> quizzes = quizService.getActiveQuizzes();
			return new ResponseEntity<>(quizzes, HttpStatus.OK);
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('NORMAL') or hasRole('ORGANIZATION')")
	@GetMapping("/active/category/{cId}")
	public ResponseEntity<?> getActiveQuizOfCategory(@PathVariable("cId") Integer cId) throws QuizException {

		if (cId == null) {
			throw new QuizException("Quiz Id Required !");
		}

		try {
			Set<Quiz> quiz = quizService.getActiveQuizzesOfCategory(cId);

			return new ResponseEntity<>(quiz, HttpStatus.OK);
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}

	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('NORMAL') or hasRole('ORGANIZATION')")
	@GetMapping("/category/{cId}")
	public ResponseEntity<?> getQuizByCategory(@PathVariable("cId") Integer cId) throws QuizException {

		if (cId == null) {
			throw new QuizException("Quiz Id Required !");
		}

		try {
			Set<Quiz> quiz = quizService.getQuizByCategory(cId);

			return new ResponseEntity<>(quiz, HttpStatus.OK);
		} catch (Exception e) {
			throw new QuizException(e.getMessage());
		}

	}


}
