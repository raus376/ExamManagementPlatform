package platform.examify.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@ToString
public class Answer {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@Column(length=10000)
	private String content;
	
	private String submittedAt;
	
	private Integer marksObtain;
	
	private Integer totalMarks;
	
	private Integer questionAttempted;
	
	private Integer numberOfCorrectAnswer;
	
	private Integer quizId;
	
	private Integer userId;
	
	

}
