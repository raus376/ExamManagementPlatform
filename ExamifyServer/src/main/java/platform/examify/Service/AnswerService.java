package platform.examify.Service;

import platform.examify.Exception.AnswerException;
import platform.examify.model.Answer;

public interface AnswerService {
	
	public Answer saveAnswer(Answer answer) throws AnswerException;

}
