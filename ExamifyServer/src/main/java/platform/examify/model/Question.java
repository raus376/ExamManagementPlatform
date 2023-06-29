package platform.examify.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "question")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long quesId;
  
	@Column(length=5000)
	private String content;

	private String image;

	private String option_1;

	private String option_2;

	private String option_3;

	private String option_4;

	private String answer;
	
	@Transient
	private String givenAnswer;

	@ManyToOne(fetch = FetchType.EAGER)
	private Quiz quiz;
 
	
}
