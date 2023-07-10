package platform.examify.Exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

	// GENERAL EXCEPTION HANDLER
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> OtherExceptionHandler(Exception exp, WebRequest req) {
		ErrorDetails authEx = new ErrorDetails();
		authEx.setTimestamp(LocalDateTime.now());
		authEx.setMessage(exp.getMessage());
		authEx.setDescription(req.getDescription(false));

		return new ResponseEntity<ErrorDetails>(authEx, HttpStatus.BAD_REQUEST);
	}

	// MANV EXCEPTION HANDLER
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorDetails> MethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException exp) {

		ErrorDetails authEx = new ErrorDetails();
		authEx.setTimestamp(LocalDateTime.now());
		authEx.setMessage("Validation Error");
		authEx.setDescription(exp.getBindingResult().getFieldError().getDefaultMessage());

		return new ResponseEntity<ErrorDetails>(authEx, HttpStatus.BAD_REQUEST);
	}

	// ACCESS DENIED EXCEPTION HANDLER
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ErrorDetails> AccessDeniedExceptionHandler(AccessDeniedException exp, WebRequest req) {
		ErrorDetails authEx = new ErrorDetails();
		authEx.setTimestamp(LocalDateTime.now());
		authEx.setMessage(exp.getMessage());
		authEx.setDescription(req.getDescription(false));

		return new ResponseEntity<ErrorDetails>(authEx, HttpStatus.FORBIDDEN);
	}

	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetails> userExceptionHandler(UserException ue, WebRequest req) {
		ErrorDetails ped = new ErrorDetails();
		ped.setTimestamp(LocalDateTime.now());
		ped.setMessage(ue.getMessage());
		ped.setDescription(req.getDescription(false));
		return new ResponseEntity<ErrorDetails>(ped, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(CategoryException.class)
	public ResponseEntity<ErrorDetails> categoryExceptionHandler(CategoryException ce, WebRequest req) {
		ErrorDetails ped = new ErrorDetails();
		ped.setTimestamp(LocalDateTime.now());
		ped.setMessage(ce.getMessage());
		ped.setDescription(req.getDescription(false));
		return new ResponseEntity<ErrorDetails>(ped, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(QuizException.class)
	public ResponseEntity<ErrorDetails> quizExceptionHandler(QuizException qe, WebRequest req) {
		ErrorDetails ped = new ErrorDetails();
		ped.setTimestamp(LocalDateTime.now());
		ped.setMessage(qe.getMessage());
		ped.setDescription(req.getDescription(false));
		return new ResponseEntity<ErrorDetails>(ped, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(QuestionException.class)
	public ResponseEntity<ErrorDetails> questionExceptionHandler(QuestionException qe, WebRequest req) {
		ErrorDetails ped = new ErrorDetails();
		ped.setTimestamp(LocalDateTime.now());
		ped.setMessage(qe.getMessage());
		ped.setDescription(req.getDescription(false));
		return new ResponseEntity<ErrorDetails>(ped, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(AnswerException.class)
	public ResponseEntity<ErrorDetails> answerExceptionHandler(AnswerException an, WebRequest req) {
		ErrorDetails ped = new ErrorDetails();
		ped.setTimestamp(LocalDateTime.now());
		ped.setMessage(an.getMessage());
		ped.setDescription(req.getDescription(false));
		return new ResponseEntity<ErrorDetails>(ped, HttpStatus.BAD_REQUEST);
	}

}
