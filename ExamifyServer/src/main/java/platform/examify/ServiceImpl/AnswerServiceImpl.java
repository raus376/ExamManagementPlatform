package platform.examify.ServiceImpl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.examify.Exception.AnswerException;
import platform.examify.Repository.AnswerRepository;
import platform.examify.Service.AnswerService;
import platform.examify.model.Answer;

@Service
public class AnswerServiceImpl implements AnswerService {

	@Autowired
	private AnswerRepository answerRepository;

	@Override
	public Answer saveAnswer(Answer answer) throws AnswerException {

		try {
			answer.setSubmittedAt(LocalDateTime.now().toString());
			Answer ans = answerRepository.save(answer);

			return ans;
		} catch (Exception e) {
			throw new AnswerException(e.getMessage());
		}
	}

}
