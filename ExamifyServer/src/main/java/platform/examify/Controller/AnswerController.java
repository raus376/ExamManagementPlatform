package platform.examify.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import platform.examify.Exception.AnswerException;
import platform.examify.Service.AnswerService;
import platform.examify.model.Answer;

@RestController
@RequestMapping("/answer")
@CrossOrigin("*")
public class AnswerController {

	@Autowired
	private AnswerService answerService;

	@PostMapping("/save")
	public ResponseEntity<Answer> saveAnswer(@RequestBody Answer answer) throws AnswerException {

		try {
			
			Answer ans = answerService.saveAnswer(answer);

			return new ResponseEntity<>(ans, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			System.err.println(e.getMessage());
			throw new AnswerException(e.getMessage());
		}
	}

}
